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
      `<p><strong>Tuote:</strong> ${pkg.title}</p>`
    ).join('');

    const emailResponse = await resend.emails.send({
      from: "tuki@omaverkkoturva.fi",
      to: [customerEmail],
      subject: "Kiitos tilauksestasi - Vahvista tilaus",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p>Hei,</p>
          
          <p>Kiitos tilauksestasi! Tässä ovat tilauksesi tiedot:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px;">
            ${packagesList}
            <p><strong>Hinta: ${totalAmount.toFixed(2)} €</strong></p>
            <p><strong>Sopimus:</strong> 24 kuukauden määräaikainen, jonka jälkeen sopimus jatkuu toistaiseksi voimassa olevana.</p>
          </div>
          
          <p>Jos sinulla herää kysyttävää tilauksestasi, voit olla yhteydessä asiakaspalveluumme:<br>
          <strong>tuki@omaverkkoturva.fi</strong></p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationUrl}" 
               style="background-color: #007acc; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Vahvista tilauksesi tästä linkistä
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            Huomaathan, että kaikilla tilauksilla on kuluttajansuojalain mukainen 14 päivän peruutusoikeus.
          </p>
          
          <p style="margin-top: 30px;">
            Ystävällisin terveisin,<br>
            Oma Verkkoturva -tiimi
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