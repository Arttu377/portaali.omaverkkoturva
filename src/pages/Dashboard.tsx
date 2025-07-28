import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { ShoppingCart, Package, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              package_title,
              package_price,
              quantity
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching orders:', error);
        } else {
          setOrders(data || []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
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


  return (
    <PageLayout>
      <div className="min-h-screen bg-background py-12 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Tervetuloa!</h1>
            <p className="text-xl text-muted-foreground">Hallitse tilauksiasi täältä.</p>
          </div>

          {/* Verkkokauppa and Tilaukseni Navigation */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingCart className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Verkkokauppa</h2>
                </div>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 w-full"
                  onClick={() => window.location.href = '/verkkokauppa'}
                >
                  Tästä verkkokauppaan
                </Button>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="h-8 w-8 text-green-600" />
                  <h2 className="text-2xl font-bold">Tilaukseni</h2>
                </div>
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 w-full"
                  onClick={() => document.getElementById('orders-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Näytä tilaukset
                </Button>
              </div>
            </div>
          </div>

          <div id="orders-section" className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Tilaukseni</h2>
            </div>
            
            {loadingOrders ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Ladataan tilauksia...</p>
              </div>
            ) : orders.length === 0 ? (
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
                          <p className="text-sm text-muted-foreground">
                            {order.customer_name} • {order.customer_email}
                          </p>
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
                            <span>{parseFloat(order.total_amount).toFixed(2)} €</span>
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
      </div>
    </PageLayout>
  );
};

export default Dashboard;