import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { confirmation_token } = await req.json()
    if (!confirmation_token) {
      throw new Error('Confirmation token is required')
    }

    // Use service role to allow public confirmation without auth
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Find order by token
    const { data: order, error: findError } = await supabase
      .from('orders')
      .select('*')
      .eq('confirmation_token', confirmation_token)
      .eq('status', 'pending')
      .single()

    if (findError || !order) {
      throw new Error('Invalid or expired confirmation token')
    }

    // Confirm order
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({ status: 'confirmed', confirmed_at: new Date().toISOString() })
      .eq('id', order.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating order:', updateError)
      throw new Error('Failed to confirm order')
    }

    return new Response(
      JSON.stringify({
        success: true,
        order_id: updatedOrder.order_id,
        message: 'Order confirmed successfully',
        customer_name: `${updatedOrder.customer_first_name} ${updatedOrder.customer_last_name}`,
        customer_email: updatedOrder.customer_email
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Error in confirm-order function:', error)
    return new Response(
      JSON.stringify({ success: false, error: (error as any).message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
