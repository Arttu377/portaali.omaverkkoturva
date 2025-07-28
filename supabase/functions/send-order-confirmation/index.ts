import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  orderId: string;
  customerEmail: string;
  customerName: string;
  confirmationToken: string;
  packages: Array<{
    title: string;
    price: string;
    quantity: number;
  }>;
  totalAmount: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      orderId, 
      customerEmail, 
      customerName, 
      confirmationToken, 
      packages, 
      totalAmount 
    }: OrderConfirmationRequest = await req.json();

    const confirmationUrl = `${req.headers.get("origin")}/confirm-order/${confirmationToken}`;
    
    const packagesList = packages.map(pkg => 
      `<li>${pkg.title} - ${pkg.price} € (${pkg.quantity} kpl)</li>`
    ).join('');

    const emailResponse = await resend.emails.send({
      from: "Wrlds <noreply@wrlds.fi>",
      to: [customerEmail],
      subject: "Kiitos tilauksestasi - Vahvista tilaus",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Kiitos tilauksestasi!</h1>
          
          <p>Hei ${customerName},</p>
          
          <p>Olemme vastaanottaneet tilauksesi. Alla tilauksen tiedot:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3>Tilausnumero: ${orderId}</h3>
            <h4>Tilatut paketit:</h4>
            <ul>
              ${packagesList}
            </ul>
            <p><strong>Kokonaissumma: ${totalAmount.toFixed(2)} €</strong></p>
          </div>
          
          <div style="background-color: #e8f4fd; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #007acc;">
            <h3 style="color: #007acc;">TÄRKEÄÄ: Vahvista tilauksesi</h3>
            <p>Jotta voimme käsitellä tilauksesi ja lähettää tunnukset, sinun tulee vahvistaa tilaus klikkaamalla alla olevaa linkkiä:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" 
                 style="background-color: #007acc; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                VAHVISTA TILAUS
              </a>
            </div>
            <p style="font-size: 12px; color: #666;">
              Jos painike ei toimi, kopioi ja liitä tämä linkki selaimesi osoiteriviin:<br>
              ${confirmationUrl}
            </p>
          </div>
          
          <p>Kun olet vahvistanut tilauksen, lähetämme sinulle tunnukset sähköpostitse.</p>
          
          <hr style="margin: 30px 0;">
          
          <p style="font-size: 12px; color: #666;">
            Tämä on automaattisesti lähetetty viesti. Älä vastaa tähän viestiin.<br>
            Jos tarvitset apua, ota yhteyttä asiakaspalveluumme.
          </p>
          
          <p style="font-size: 12px; color: #666;">
            Ystävällisin terveisin,<br>
            Wrlds-tiimi
          </p>
        </div>
      `,
    });

    console.log("Order confirmation email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending order confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);