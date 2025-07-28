import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Package, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  order_number: string | null;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  confirmed_at: string | null;
  created_at: string;
  order_items: Array<{
    package_title: string;
    quantity: number;
    package_price: number;
  }>;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    email: string;
  } | null;
}

const OrderOverview = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchOrders();
      
      // Set up real-time subscription for order confirmations
      const channel = supabase
        .channel('order-confirmations')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'order_confirmations'
          },
          () => {
            fetchOrders(); // Refresh orders when confirmation is received
            toast({
              title: "Tilaus vahvistettu",
              description: "Tilaus on vahvistettu onnistuneesti.",
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, toast]);

  const fetchOrders = async () => {
    if (!user) return;
    
    try {
      // Check if user is admin
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      
      const isAdmin = roleData?.role === 'admin';
      
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items (
            package_title,
            quantity,
            package_price
          ),
          profiles (
            first_name,
            last_name,
            email
          )
        `);
      
      // If not admin, only show user's own orders
      if (!isAdmin) {
        query = query.eq('user_id', user.id);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Virhe",
        description: "Tilausten lataaminen epäonnistui.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string, confirmedAt: string | null) => {
    if (confirmedAt) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    if (status === 'pending') {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    }
    return <AlertCircle className="h-4 w-4 text-gray-500" />;
  };

  const getStatusText = (status: string, confirmedAt: string | null) => {
    if (confirmedAt) return 'Vahvistettu';
    if (status === 'pending') return 'Odottaa vahvistusta';
    return status;
  };

  const getStatusVariant = (status: string, confirmedAt: string | null): "default" | "secondary" | "destructive" | "outline" => {
    if (confirmedAt) return 'default';
    if (status === 'pending') return 'secondary';
    return 'outline';
  };

  if (authLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-background py-12 pt-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center min-h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-background py-12 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Tilaukseni</h1>
          </div>
          
          {orders.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Ei tilauksia</p>
                <p className="text-muted-foreground mb-4">Et ole vielä tehnyt yhtään tilausta.</p>
                <Button onClick={() => window.location.href = '/verkkokauppa'}>
                  Siirry verkkokauppaan
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="w-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                       <div>
                         <CardTitle className="text-lg">
                           Tilaus #{order.order_number || order.id.slice(0, 8)}
                         </CardTitle>
                         <p className="text-sm text-muted-foreground">
                           {new Date(order.created_at).toLocaleDateString('fi-FI')}
                         </p>
                         <div className="text-sm text-muted-foreground space-y-1">
                           <p><strong>Asiakas:</strong> {order.customer_name} • {order.customer_email}</p>
                           {order.profiles && (
                             <p><strong>Tilaaja:</strong> {order.profiles.first_name && order.profiles.last_name 
                               ? `${order.profiles.first_name} ${order.profiles.last_name}` 
                               : order.profiles.email}</p>
                           )}
                         </div>
                       </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status, order.confirmed_at)}
                        <Badge variant={getStatusVariant(order.status, order.confirmed_at)}>
                          {getStatusText(order.status, order.confirmed_at)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Tilatut paketit:</h4>
                        <ul className="space-y-1">
                          {order.order_items.map((item: any, index: number) => (
                            <li key={index} className="flex justify-between text-sm">
                              <span>{item.package_title} ({item.quantity} kpl)</span>
                              <span>{(item.package_price * item.quantity).toFixed(2)} €</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-medium">
                          <span>Yhteensä:</span>
                          <span>{Number(order.total_amount).toFixed(2)} €</span>
                        </div>
                      </div>
                      {order.status === 'pending' && !order.confirmed_at && (
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Toimenpiteet:</strong> Tarkista sähköpostisi ja vahvista tilaus klikkaamalla vahvistuslinkkiä.
                          </p>
                        </div>
                      )}
                      {order.confirmed_at && (
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Vahvistettu:</strong> {new Date(order.confirmed_at).toLocaleDateString('fi-FI')} {new Date(order.confirmed_at).toLocaleTimeString('fi-FI')}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default OrderOverview;