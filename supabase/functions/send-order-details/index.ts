import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderDetailsRequest {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    address: string;
    postalCode: string;
    city: string;
    promoCode?: string;
  };
  orderItems: Array<{
    title: string;
    price: string;
    quantity: number;
  }>;
  totalPrice: number;
  orderDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerInfo, orderItems, totalPrice, orderDate }: OrderDetailsRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "tuki@omaverkkoturva.fi",
      to: ["tuki@omaverkkoturva.fi"],
      subject: `Uusi tilaus - ${customerInfo.firstName} ${customerInfo.lastName}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 800px; margin: 0 auto; background-color: #f8f9fa; color: #333; padding: 40px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 32px; background-color: #1e3a8a; color: white; padding: 20px; border-radius: 8px;">
            <h1 style="font-size: 28px; font-weight: bold; margin: 0; color: white;">
              🎉 Uusi tilaus vastaanotettu!
            </h1>
            <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">
              Tilausaika: ${new Date(orderDate).toLocaleString('fi-FI')}
            </p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
            <h2 style="font-size: 22px; font-weight: bold; margin: 0 0 20px 0; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">
              👤 Asiakastiedot
            </h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Etunimi</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600;">${customerInfo.firstName}</p>
              </div>
              <div>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Sukunimi</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600;">${customerInfo.lastName}</p>
              </div>
              <div>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Sähköposti</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600;">${customerInfo.email}</p>
              </div>
              <div>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Puhelin</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600;">${customerInfo.phone}</p>
              </div>
              <div>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Syntymäaika</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600;">${customerInfo.birthDate}</p>
              </div>
              ${customerInfo.promoCode ? `
                <div>
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Tarjouskoodi</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 600; color: #059669;">${customerInfo.promoCode}</p>
                </div>
              ` : ''}
            </div>
          </div>

          <div style="background-color: white; padding: 30px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
            <h2 style="font-size: 22px; font-weight: bold; margin: 0 0 20px 0; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">
              🏠 Laskutustiedot
            </h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="grid-column: 1 / -1;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Osoite</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600;">${customerInfo.address}</p>
              </div>
              <div>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Postinumero</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600;">${customerInfo.postalCode}</p>
              </div>
              <div>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Postitoimipaikka</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600;">${customerInfo.city}</p>
              </div>
            </div>
          </div>

          <div style="background-color: white; padding: 30px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
            <h2 style="font-size: 22px; font-weight: bold; margin: 0 0 20px 0; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">
              🛒 Tilatut tuotteet
            </h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
              ${orderItems.map(item => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e5e7eb; ${orderItems.indexOf(item) === orderItems.length - 1 ? 'border-bottom: none;' : ''}">
                  <div>
                    <p style="margin: 0; font-size: 16px; font-weight: 600;">${item.title}</p>
                    <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">Määrä: ${item.quantity}</p>
                  </div>
                  <p style="margin: 0; font-size: 16px; font-weight: bold; color: #1e3a8a;">${item.price}</p>
                </div>
              `).join('')}
            </div>
            <div style="text-align: right; padding-top: 16px; border-top: 2px solid #1e3a8a;">
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1e3a8a;">
                Yhteensä: ${totalPrice.toFixed(2).replace('.', ',')} €/kk
              </p>
            </div>
          </div>

          <div style="background-color: #1e3a8a; color: white; padding: 20px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 16px; font-weight: 600;">
              💰 Tilaus on vastaanotettu ja odottaa käsittelyä
            </p>
            <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">
              Asiakas on hyväksynyt sopimusehdot ja tietosuojaselosteen
            </p>
          </div>

          <div style="margin-top: 32px; text-align: center; color: #6b7280; font-size: 14px;">
            <p style="margin: 0;">
              Tämä viesti on lähetetty automaattisesti OmaVerkkoturva-tilausjärjestelmästä
            </p>
          </div>
        </div>
      `,
    });

    console.log("Order details email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending order details:", error);
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
