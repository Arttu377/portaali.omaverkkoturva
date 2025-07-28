import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ConfirmOrder = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const confirmOrder = async () => {
      if (!token) {
        setError('Virheellinen vahvistuslinkki');
        setLoading(false);
        return;
      }

      try {
        console.log('Confirming order with token:', token);
        
        // Check if order exists and is not already confirmed
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('confirmation_token', token)
          .single();

        console.log('Order query result:', { order, orderError });

        if (orderError || !order) {
          console.error('Order not found:', orderError);
          setError('Tilausta ei löytynyt tai linkki on virheellinen');
          setLoading(false);
          return;
        }

        if (order.confirmed_at) {
          setError('Tilaus on jo vahvistettu aiemmin');
          setLoading(false);
          return;
        }

        // Get user's IP and user agent for logging
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();
        const userAgent = navigator.userAgent;

        // Confirm the order
        const { error: updateError } = await supabase
          .from('orders')
          .update({ 
            confirmed_at: new Date().toISOString(),
            status: 'confirmed'
          })
          .eq('id', order.id);

        if (updateError) {
          throw updateError;
        }

        // Log the confirmation
        const { error: logError } = await supabase
          .from('order_confirmations')
          .insert({
            order_id: order.id,
            ip_address: ip,
            user_agent: userAgent
          });

        if (logError) {
          console.error('Failed to log confirmation:', logError);
        }

        setOrderDetails(order);
        setConfirmed(true);
        
        toast({
          title: "Tilaus vahvistettu!",
          description: "Lähetämme tunnukset sähköpostitse pian.",
        });

      } catch (err: any) {
        console.error('Error confirming order:', err);
        setError('Virhe vahvistettaessa tilausta');
      } finally {
        setLoading(false);
      }
    };

    confirmOrder();
  }, [token, toast]);

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-background py-12 pt-32">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Vahvistetaan tilausta...</h1>
            <p className="text-muted-foreground">Odota hetki, käsittelemme vahvistustasi.</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-background py-12 pt-32">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Virhe vahvistettaessa</h1>
            <p className="text-lg text-muted-foreground mb-8">{error}</p>
            <Button onClick={() => navigate('/')} variant="outline">
              Palaa etusivulle
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (confirmed) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-background py-12 pt-32">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Kiitos tilauksen vahvituksesta!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Saat meiltä hetken päästä sähköpostia, jossa annamme tarkat ohjeet kuinka pääset ottamaan tuotteen käyttöön.
            </p>
            
            {orderDetails && (
              <div className="bg-muted/50 p-6 rounded-lg mb-8 text-left">
                <h3 className="font-semibold mb-2">Tilauksen tiedot:</h3>
                <p><strong>Tilausnumero:</strong> {orderDetails.id}</p>
                <p><strong>Sähköposti:</strong> {orderDetails.customer_email}</p>
                <p><strong>Kokonaissumma:</strong> {orderDetails.total_amount} €</p>
                <p><strong>Vahvistettu:</strong> {new Date().toLocaleString('fi-FI')}</p>
              </div>
            )}
            
            <div className="text-center">
              <Button onClick={() => navigate('/')} variant="outline">
                Etusivulle
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return null;
};

export default ConfirmOrder;