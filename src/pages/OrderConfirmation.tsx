import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderConfirmationResponse {
  success: boolean;
  order_id: string;
  message: string;
  customer_name: string;
  customer_email: string;
}

const OrderConfirmation = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [orderData, setOrderData] = useState<OrderConfirmationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError('Vahvistustoken puuttuu');
      setLoading(false);
      return;
    }

    confirmOrder();
  }, [token]);

  const confirmOrder = async () => {
    try {
      // Get current session token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('No active session');
        setError('Ei aktiivista istuntoa');
        setLoading(false);
        return;
      }

      const response = await fetch('https://fsirlcxhtyppecjjdqbp.supabase.co/functions/v1/confirm-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ confirmation_token: token }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setOrderData(data);
      } else {
        setError(data.error || 'Tilauksen vahvistus epäonnistui');
      }
    } catch (err) {
      setError('Virhe tilauksen vahvistuksessa');
      console.error('Error confirming order:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Vahvistetaan tilauksesi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-600">Vahvistus epäonnistui</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => navigate('/')} className="w-full">
              Palaa etusivulle
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success && orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-green-600">Tilaus vahvistettu!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Kiitos, {orderData.customer_name}! Tilauksesi on nyt vahvistettu.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800">Tilausnumero: {orderData.order_id}</p>
                <p className="text-gray-600">Sähköposti: {orderData.customer_email}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Mitä tapahtuu seuraavaksi?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Saat pian aktivointiohjeet sähköpostiin
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Palvelu aktivoituu 24 tunnin sisällä
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Ensimmäinen laskutus lähetetään aktivointia seuraavana kuukautena
                </li>
              </ul>
            </div>

            <div className="text-center pt-4">
              <Button onClick={() => navigate('/')} className="w-full">
                Palaa etusivulle
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default OrderConfirmation;
