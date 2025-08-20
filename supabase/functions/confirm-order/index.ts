import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Check authorization header
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing authorization header'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    
    // Verify token with Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey)
    
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid or expired token'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    const { confirmation_token } = await req.json()

    if (!confirmation_token) {
      throw new Error('Confirmation token is required')
    }

    // Create Supabase client for database operations
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Find order by confirmation token
    const { data: order, error: findError } = await supabase
      .from('orders')
      .select('*')
      .eq('confirmation_token', confirmation_token)
      .eq('status', 'pending')
      .single()

    if (findError || !order) {
      throw new Error('Invalid or expired confirmation token')
    }

    // Update order status to confirmed
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'confirmed',
        confirmed_at: new Date().toISOString()
      })
      .eq('id', order.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating order:', updateError)
      throw new Error('Failed to confirm order')
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        order_id: updatedOrder.order_id,
        message: 'Order confirmed successfully',
        customer_name: `${updatedOrder.customer_first_name} ${updatedOrder.customer_last_name}`,
        customer_email: updatedOrder.customer_email
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in confirm-order function:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Internal server error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
