import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OrderData {
  customer_email: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_phone?: string;
  customer_birth_date?: string;
  billing_address: string;
  billing_postal_code: string;
  billing_city: string;
  products: any[];
  total_price: number;
  promo_code?: string;
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

    const { orderData } = await req.json()

    // Validate required fields
    if (!orderData.customer_email || !orderData.customer_first_name || !orderData.customer_last_name) {
      throw new Error('Missing required customer information')
    }

    if (!orderData.billing_address || !orderData.billing_postal_code || !orderData.billing_city) {
      throw new Error('Missing required billing information')
    }

    if (!orderData.products || orderData.products.length === 0) {
      throw new Error('No products in order')
    }

    // Create Supabase client for database operations
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Generate unique order ID and confirmation token
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const confirmationToken = Math.random().toString(36).substr(2, 15) + Date.now().toString(36)

    // Prepare order data for database
    const orderRecord = {
      order_id: orderId,
      customer_email: orderData.customer_email,
      customer_first_name: orderData.customer_first_name,
      customer_last_name: orderData.customer_last_name,
      customer_phone: orderData.customer_phone || null,
      customer_birth_date: orderData.customer_birth_date ? new Date(orderData.customer_birth_date) : null,
      billing_address: orderData.billing_address,
      billing_postal_code: orderData.billing_postal_code,
      billing_city: orderData.billing_city,
      products: orderData.products,
      total_price: orderData.total_price,
      promo_code: orderData.promo_code || null,
      confirmation_token: confirmationToken,
      status: 'pending'
    }

    // Insert order into database
    const { data, error } = await supabase
      .from('orders')
      .insert(orderRecord)
      .select()
      .single()

    if (error) {
      console.error('Error inserting order:', error)
      throw new Error('Failed to save order')
    }

    // Return success response with order details
    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderId,
        confirmation_token: confirmationToken,
        message: 'Order saved successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in save-order function:', error)
    
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
