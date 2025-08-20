import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowLeft, Calendar, Home, ShoppingCart, LogOut, User, Mail, Phone, MapPin, ChevronDown, ChevronUp, Search, Shield } from 'lucide-react';

interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  billing_address: {
    city: string;
    address: string;
    postalCode: string;
  };
  total_amount: number;
  status: string;
  confirmed_at: string;
  created_at: string;
  updated_at: string;
}

const ConfirmedOrders = () => {
  const { user, loading: authLoading, signOut, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('useEffect triggered, user:', user);
    if (user) {
      console.log('User found, calling fetchConfirmedOrders');
      fetchConfirmedOrders();
    } else {
      console.log('No user found');
    }
  }, [user]);

  const fetchConfirmedOrders = async () => {
    try {
      console.log('Fetching confirmed orders...');
      
      // Get current session token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('No active session');
        return;
      }

      const response = await fetch(`https://fsirlcxhtyppecjjdqbp.supabase.co/functions/v1/get-orders?status=confirmed&scope=mine`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        console.log('First order details:', data.orders?.[0]);
        console.log('First order total_amount:', data.orders?.[0]?.total_amount);
        
        // LISÄÄ TÄMÄ DEBUG-KOODI:
        if (data.orders && data.orders.length > 0) {
          const firstOrder = data.orders[0];
          console.log('=== FIRST ORDER FULL DEBUG ===');
          console.log('All keys:', Object.keys(firstOrder));
          console.log('Full order object:', JSON.stringify(firstOrder, null, 2));
          console.log('=============================');
        }
        
        setOrders(data.orders || []);
        console.log('Orders set:', data.orders || []);
      } else {
        console.error('Response not ok:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      order.customer_name.toLowerCase().includes(searchLower) ||
      order.customer_email.toLowerCase().includes(searchLower) ||
      (order.customer_phone && order.customer_phone.includes(searchTerm)) ||
      (order.billing_address?.address && order.billing_address.address.toLowerCase().includes(searchLower)) ||
      (order.billing_address?.city && order.billing_address.city.toLowerCase().includes(searchLower)) ||
      (order.billing_address?.postalCode && order.billing_address.postalCode.includes(searchTerm))
    );
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fi-FI', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) {
      return '0,00 €/kk';
    }
    return `${price.toFixed(2).replace('.', ',')} €/kk`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-8">OmaVerkkoturva</h2>
          
          {/* Navigation Items */}
          <nav className="space-y-2">
            {/* Hallintapaneeli */}
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Hallintapaneeli</span>
            </button>

            {/* Verkkokauppa */}
            <button
              onClick={() => navigate('/verkkokauppa')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Verkkokauppa</span>
            </button>

            {/* Tilaukseni - aktiivinen */}
            <button
              onClick={() => navigate('/tilaukset')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">Tilaukseni</span>
            </button>

            {/* Ylläpito (vain admin) */}
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Ylläpito</span>
              </button>
            )}

            {/* Kirjaudu ulos */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Kirjaudu ulos</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/tilaukset')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
                         <div className="flex items-center gap-3">
               <CheckCircle className="h-8 w-8 text-green-600" />
               <h1 className="text-3xl font-bold text-gray-800">Vahvistetut tilaukset</h1>
               <Badge variant="secondary" className="ml-4">
                 {filteredOrders.length} tilaus
               </Badge>
             </div>
           </div>

                      {/* Search Bar */}
           <div className="mb-6">
             <div className="relative max-w-md">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
               <input
                 type="text"
                 placeholder="Hae asiakkaan nimellä, sähköpostilla, puhelinnumerolla tai osoitteella..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               />
             </div>
           </div>
          
          {/* Orders List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Ladataan tilauksia...</p>
            </div>
          ) : orders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ei vahvistettuja tilauksia</h3>
                <p className="text-gray-600 mb-4">Kaikki tilaukset odottavat vielä vahvistusta tai ei ole tilauksia.</p>
                <Button onClick={() => navigate('/verkkokauppa')}>
                  Siirry verkkokauppaan
                </Button>
              </CardContent>
            </Card>
                     ) : (
                          <div className="space-y-4">
                {filteredOrders.map((order) => (
                 <Card key={order.id} className="hover:shadow-lg transition-shadow">
                   {/* Compact Header - Always Visible */}
                   <div 
                     className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                     onClick={() => toggleOrderExpansion(order.id)}
                   >
                     <div className="flex justify-between items-center">
                       <div className="flex items-center gap-4">
                         <div>
                           <h3 className="text-lg font-semibold text-gray-800">
                             Tilaus {order.order_number}
                           </h3>
                           <div className="text-sm text-gray-600 space-y-1">
                             <p>Luotu: {formatDate(order.created_at)}</p>
                             <p>Vahvistettu: {formatDate(order.confirmed_at)}</p>
                           </div>
                         </div>
                         <Badge variant="default" className="text-green-600 bg-green-100 border-green-600">
                           Vahvistettu
                         </Badge>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="text-right">
                           <div className="text-xl font-bold text-gray-800">
                             {formatPrice(order.total_amount)}
                           </div>
                         </div>
                         {expandedOrders.has(order.id) ? (
                           <ChevronUp className="w-5 h-5 text-gray-500" />
                         ) : (
                           <ChevronDown className="w-5 h-5 text-gray-500" />
                         )}
                       </div>
                     </div>
                   </div>
                   
                   {/* Expandable Details */}
                   {expandedOrders.has(order.id) && (
                     <CardContent className="pt-0 border-t border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* Customer Information */}
                         <div>
                           <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                             <User className="w-4 h-4" />
                             Asiakastiedot
                           </h4>
                           <div className="space-y-2 text-sm">
                             <p><strong>Nimi:</strong> {order.customer_name}</p>
                             <p className="flex items-center gap-2">
                               <Mail className="w-4 h-4 text-gray-500" />
                               {order.customer_email}
                             </p>
                             {order.customer_phone && (
                               <p className="flex items-center gap-2">
                                 <Phone className="w-4 h-4 text-gray-500" />
                                 {order.customer_phone}
                               </p>
                             )}
                           </div>
                         </div>
                         
                         {/* Billing Information */}
                         <div>
                           <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                             <MapPin className="w-4 h-4" />
                             Laskutustiedot
                           </h4>
                           <div className="space-y-2 text-sm">
                             <p>{order.billing_address?.address || 'Ei osoitetta'}</p>
                             <p>{order.billing_address?.postalCode} {order.billing_address?.city}</p>
                           </div>
                         </div>
                       </div>

                       {/* Confirmation Info */}
                       <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
                         <div className="flex items-start gap-3">
                           <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                           <div>
                             <p className="text-sm text-green-800 font-medium mb-1">
                               Tilaus vahvistettu:
                             </p>
                             <p className="text-sm text-green-700">
                               {formatDate(order.confirmed_at)}
                             </p>
                             <p className="text-sm text-green-700 mt-1">
                               Tilaus on aktiivinen ja palvelu on käytössä.
                             </p>
                           </div>
                         </div>
                       </div>
                     </CardContent>
                   )}
                 </Card>
               ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmedOrders;
