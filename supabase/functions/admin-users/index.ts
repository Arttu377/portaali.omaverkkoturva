import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-access-token',
}

interface CreatePayload {
  email: string
  password: string
  first_name?: string
  last_name?: string
  role?: 'admin' | 'user'
}

interface DeletePayload {
  user_id: string
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    let authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
    if (!authHeader) {
      const xToken = req.headers.get('x-access-token')
      if (xToken) {
        authHeader = xToken.startsWith('Bearer ') ? xToken : `Bearer ${xToken}`
      }
    }
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ success: false, error: 'Missing authorization header' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    const token = authHeader.replace('Bearer ', '')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey)

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token)
    if (authError || !user) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid or expired token' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Ensure caller is admin
    const { data: roleRow, error: roleErr } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()
    if (roleErr || roleRow?.role !== 'admin') {
      return new Response(JSON.stringify({ success: false, error: 'Forbidden' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 403,
      })
    }

    const body = await req.json().catch(() => ({}))
    const action = body?.action as 'create' | 'delete'
    const payload = body?.payload as CreatePayload | DeletePayload

    if (!action) {
      throw new Error('Missing action')
    }

    if (action === 'create') {
      const p = payload as CreatePayload
      if (!p?.email || !p?.password) {
        throw new Error('Missing required fields (email, password)')
      }

      const { data: created, error: createError } = await supabase.auth.admin.createUser({
        email: p.email,
        password: p.password,
        email_confirm: true,
        user_metadata: {
          first_name: p.first_name ?? null,
          last_name: p.last_name ?? null,
        }
      })
      if (createError) {
        console.error('createUser error:', createError)
        throw new Error(createError.message)
      }

      const newUserId = created.user?.id
      if (newUserId) {
        // Set selected role (default to user)
        const newRole = (p.role === 'admin') ? 'admin' : 'user'
        // Clean any existing rows for safety
        await supabase.from('user_roles').delete().eq('user_id', newUserId)
        const { error: roleInsertErr } = await supabase.from('user_roles').insert({ user_id: newUserId, role: newRole as any })
        if (roleInsertErr) {
          console.error('role insert error:', roleInsertErr)
          throw new Error(roleInsertErr.message)
        }
      }

      return new Response(JSON.stringify({ success: true, user_id: newUserId }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    if (action === 'delete') {
      const p = payload as DeletePayload
      if (!p?.user_id) {
        throw new Error('Missing user_id')
      }
      if (p.user_id === user.id) {
        throw new Error('Cannot delete your own account')
      }

      // 1) Poista käyttäjän tilaukset ensin, jotta FK-viittaukset eivät estä profiilin poistumista
      const { error: ordersDelErr } = await supabase
        .from('orders')
        .delete()
        .eq('user_id', p.user_id)
      if (ordersDelErr) {
        console.error('delete orders error:', ordersDelErr)
        throw new Error('Failed to delete user orders')
      }

      // 2) Poista auth-käyttäjä
      const { error: delErr } = await supabase.auth.admin.deleteUser(p.user_id)
      if (delErr) {
        console.error('deleteUser error:', delErr)
        throw new Error(delErr.message)
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    throw new Error('Unsupported action')
  } catch (error) {
    console.error('Error in admin-users function:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return new Response(JSON.stringify({ success: false, error: message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})


