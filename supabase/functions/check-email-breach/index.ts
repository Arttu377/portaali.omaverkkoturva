import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const { email } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Call Have I Been Pwned API with full breach data
    const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`, {
      headers: {
        'hibp-api-key': '4b94686e2e8740fb82ae6106cffddcd5',
        'user-agent': 'Wrlds-Identity-Protection'
      }
    })

    if (response.status === 404) {
      // No breaches found
      return new Response(
        JSON.stringify({ 
          found: false, 
          message: 'Sähköpostiosoitteesi ei ole esiintynyt tunnettujen tietovuotojen tiedoissa.' 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    } else if (response.ok) {
      const breaches = await response.json()
      return new Response(
        JSON.stringify({ 
          found: true, 
          breaches, 
          count: breaches.length 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    } else {
      const errorText = await response.text()
      console.error('Have I Been Pwned API error:', response.status, errorText)
      return new Response(
        JSON.stringify({ 
          error: `API request failed with status ${response.status}` 
        }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
