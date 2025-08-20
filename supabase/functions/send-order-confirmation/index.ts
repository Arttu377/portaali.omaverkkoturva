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
    
    // Extract first name from customer name
    const firstName = customerName.split(' ')[0];

    const emailResponse = await resend.emails.send({
      from: "tuki@omaverkkoturva.fi",
      to: [customerEmail],
      subject: "Tervetuloa OmaVerkkoturva-palveluun!",
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #333333; padding: 40px; border-radius: 12px; border: 1px solid #e5e7eb;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 28px; font-weight: bold; margin: 0; color: #1e3a8a;">
              Tervetuloa OmaVerkkoturva-palveluun!
            </h1>
          </div>
          
          <div style="text-align: left; line-height: 1.6; margin-bottom: 32px;">
            <p style="margin: 0 0 16px 0; font-size: 16px;">
              Hei ${firstName},
            </p>
            <p style="margin: 0 0 16px 0; font-size: 16px;">
              Kiitos tilauksestasi!
            </p>
            <p style="margin: 0 0 16px 0; font-size: 16px;">
              Tämä tilausvahvistus toimii kuitteena tilauksestanne. Sopimusehdot, vakuutusehdot, tietosuojaseloste ja peruutusohjeet löytyvät osoitteesta omaverkkoturva.fi.
            </p>
            <p style="margin: 0 0 16px 0; font-size: 16px;">
              OmaVerkkoturva huolehtii siitä, että henkilötietosi pysyvät turvassa. Palvelu valvoo jatkuvasti, myydäänkö tietojasi verkossa tai käytetäänkö niitä rikolliseen toimintaan, ja ilmoittaa sinulle heti, jos havaitsee epäilyttävää toimintaa (esimerkiksi jos Facebook-salasanasi tai luottokorttitietosi ovat vuotaneet).
            </p>
          </div>
          
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 20px; font-weight: bold; margin: 0 0 16px 0; color: #1e3a8a;">
              Tilaamasi tuote:
            </h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #e5e7eb;">
              ${packages.map(pkg => `
                <p style="margin: 0 0 8px 0; font-size: 16px;">
                  <strong>${pkg.title}</strong>
                </p>
                <p style="margin: 0 0 8px 0; font-size: 16px;">
                  Hinta: 1kk 0€, tämän jälkeen ${pkg.price}
                </p>
                <p style="margin: 0 0 8px 0; font-size: 16px;">
                  Määrä: ${pkg.quantity || 1}
                </p>
              `).join('')}
            </div>
            <ul style="margin: 0 0 16px 0; padding-left: 20px;">
              <li style="margin: 0 0 8px 0; font-size: 16px;">Sopimus on määräaikainen ja kestää 24 kuukautta.</li>
              <li style="margin: 0 0 8px 0; font-size: 16px;">Palvelulla on 14 päivän peruutusoikeus.</li>
              <li style="margin: 0 0 8px 0; font-size: 16px;">Aktivointiohjeet lähetetään sinulle erillisessä sähköpostissa.</li>
            </ul>
            <p style="margin: 0 0 16px 0; font-size: 16px;">
              Ennen aktivointia, vahvistathan tilauksesi klikkaamalla alla olevaa painiketta:
            </p>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${confirmationUrl}" 
               style="background-color: #1e3a8a; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
              Vahvista tilaus
            </a>
          </div>
          
          <div style="margin-top: 32px; text-align: center; background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">
              Kiitos, että valitsit OmaVerkkoturvan - pidämme huolen tietoturvastasi.
            </p>
            <p style="margin: 0; font-size: 16px;">
              Ystävällisin terveisin,<br>
              <strong>OmaVerkkoturva-tiimi</strong>
            </p>
          </div>
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