import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, Clock, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
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
}

const OrderOverview = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
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
            description: "Asiakas on vahvistanut tilauksen.",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            package_title,
            quantity,
            package_price
          )
        `)
        .order('created_at', { ascending: false });

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

  const getStatusIcon = (order: Order) => {
    if (order.confirmed_at) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
    return <Clock className="h-4 w-4 text-yellow-600" />;
  };

  const getStatusText = (order: Order) => {
    if (order.confirmed_at) {
      return "Vahvistettu";
    }
    return "Odottaa vahvistusta";
  };

  const getStatusVariant = (order: Order): "default" | "secondary" | "destructive" | "outline" => {
    if (order.confirmed_at) {
      return "default";
    }
    return "secondary";
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Package className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Tilaukset</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Kaikki tilaukset</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Ei tilauksia vielä.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tilausnumero</TableHead>
                    <TableHead>Asiakas</TableHead>
                    <TableHead>Tuotteet</TableHead>
                    <TableHead>Summa</TableHead>
                    <TableHead>Luotu</TableHead>
                    <TableHead>Tila</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer_name}</div>
                          <div className="text-sm text-muted-foreground">{order.customer_email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.order_items.map((item, index) => (
                            <div key={index} className="text-sm">
                              {item.quantity}x {item.package_title}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{Number(order.total_amount).toFixed(2)} €</TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString('fi-FI')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(order)} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(order)}
                          {getStatusText(order)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default OrderOverview;