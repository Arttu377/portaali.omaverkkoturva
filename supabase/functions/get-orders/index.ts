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

    // DEBUG: Log the authenticated user ID
    console.log('=== DEBUG: get-orders function ===')
    console.log('Authenticated user ID:', user.id)
    console.log('Authenticated user email:', user.email)

    const url = new URL(req.url)
    const status = url.searchParams.get('status')
    const scope = url.searchParams.get('scope') // 'all' to allow admins to fetch all orders

    console.log('Request status:', status)
    console.log('Request scope:', scope)

    if (!status) {
      throw new Error('Status parameter is required')
    }

    // Create Supabase client for database operations
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check if the requester is an admin
    const { data: roleRow } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()
    const isAdmin = roleRow?.role === 'admin'

    console.log('User role:', roleRow?.role)
    console.log('Is admin:', isAdmin)

    // Build base query
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    // If not admin with scope=all, restrict strictly to own orders by user_id
    if (!(isAdmin && scope === 'all')) {
      console.log('Filtering orders by user_id:', user.id)
      query = query.eq('user_id', user.id)
    } else {
      console.log('Admin fetching all orders (scope=all)')
    }

    if (status === 'pending') {
      query = query.eq('status', 'pending')
    } else if (status === 'confirmed') {
      query = query.eq('status', 'confirmed')
    } else if (status === 'cancelled') {
      query = query.eq('status', 'cancelled')
    }

    const { data: orders, error } = await query

    if (error) {
      console.error('Error fetching orders:', error)
      throw new Error('Failed to fetch orders')
    }

    console.log('Orders found:', orders?.length || 0)
    if (orders && orders.length > 0) {
      console.log('First order user_id:', orders[0].user_id)
    }

    // Return orders
    return new Response(
      JSON.stringify({
        success: true,
        orders: orders || [],
        count: orders?.length || 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in get-orders function:', error)
    
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
