import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Users, UserPlus, Shield, Package, CheckCircle, Clock, Home, ShoppingCart, LogOut, ChevronDown, Search } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  role?: string;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  total_amount: number;
  status: string;
  confirmed_at: string | null;
  created_at: string;
  user_id: string;
  billing_address?: {
    address: string;
    postalCode: string;
    city: string;
  } | null;
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
  order_confirmations?: Array<{
    confirmed_at: string;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
  }> | null;
}

interface ExpandedOrder {
  [key: string]: boolean;
}

const AdminPortal = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<ExpandedOrder>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdmin) {
      // Non-admins cannot access this page
      return;
    }
    fetchProfiles();
    fetchOrders();
    
    // Set up real-time subscription for order confirmations
    const channel = supabase
      .channel('admin-order-updates')
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
  }, [toast, isAdmin]);

  const fetchProfiles = async () => {
    try {
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch roles for each profile
      const profilesWithRoles = await Promise.all(
        (profilesData || []).map(async (profile) => {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.user_id)
            .single();
          
          return {
            ...profile,
            role: roleData?.role || 'user'
          };
        })
      );

      setProfiles(profilesWithRoles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: "Virhe",
        description: "Käyttäjien lataaminen epäonnistui.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          ),
          profiles (
            first_name,
            last_name,
            email
          ),
          order_confirmations (
            confirmed_at,
            ip_address,
            user_agent,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched orders data:', data);
      setOrders((data || []) as unknown as Order[]);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Virhe",
        description: "Tilausten lataaminen epäonnistui.",
        variant: "destructive",
      });
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const role = (formData.get('role') as string) || 'user';

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const { data, error } = await supabase.functions.invoke('admin-users', {
        body: {
          action: 'create',
          payload: {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            role,
          },
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'x-access-token': session.access_token,
        },
      });

      if (error || !data?.success) {
        throw new Error(data?.error || error?.message || 'Käyttäjän luonti epäonnistui');
      }

      toast({
        title: "Käyttäjä luotu",
        description: `Käyttäjä ${email} luotiin onnistuneesti.`,
      });

      setIsCreateDialogOpen(false);
      form.reset();
      await fetchProfiles();
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Virhe",
        description: (error instanceof Error ? error.message : "Käyttäjän luominen epäonnistui."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const { data, error } = await supabase.functions.invoke('admin-users', {
        body: {
          action: 'delete',
          payload: { user_id: userId },
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'x-access-token': session.access_token,
        },
      });

      if (error || !data?.success) {
        throw new Error(data?.error || error?.message || 'Käyttäjän poistaminen epäonnistui');
      }

      toast({ title: 'Käyttäjä poistettu' });
      await fetchProfiles();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Virhe',
        description: (error instanceof Error ? error.message : 'Käyttäjän poistaminen epäonnistui.'),
        variant: 'destructive',
      });
    }
  };

     const adminUsers = profiles.filter(profile => profile.role === 'admin').length;
   const regularUsers = profiles.filter(profile => profile.role === 'user').length;
   const pendingOrders = orders.filter(order => !order.confirmed_at).length;
   const confirmedOrders = orders.filter(order => order.confirmed_at).length;
   const totalConfirmations = orders.reduce((total, order) => 
     total + (order.order_confirmations?.length || 0), 0
   );

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

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Hae tilausnumerolla
    if (order.order_number?.toLowerCase().includes(searchLower) || 
        order.id.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    // Hae asiakastiedoilla
    if (order.customer_name?.toLowerCase().includes(searchLower) ||
        order.customer_email?.toLowerCase().includes(searchLower) ||
        order.customer_phone?.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    // Hae myyjän tiedoilla
    if (order.profiles?.first_name?.toLowerCase().includes(searchLower) ||
        order.profiles?.last_name?.toLowerCase().includes(searchLower) ||
        order.profiles?.email?.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    return false;
  });

  const filteredProfiles = profiles.filter(profile => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Hae nimellä
    if (profile.first_name?.toLowerCase().includes(searchLower) ||
        profile.last_name?.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    // Hae sähköpostilla
    if (profile.email.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    return false;
  });

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-8">OmaVerkkoturva</h2>
          <nav className="space-y-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Hallintapaneeli</span>
            </button>
            <button
              onClick={() => navigate('/portaalin-verkkokauppa')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Verkkokauppa</span>
            </button>
            <button
              onClick={() => navigate('/tilaukset')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">Tilaukseni</span>
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Shield className="w-5 h-5" />
              <span className="font-medium">Ylläpito</span>
            </button>
            <button
              onClick={async () => { await signOut(); }}
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
          <div className="flex items-center gap-2 mb-8">
            <Shield className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Admin Portaali</h1>
          </div>

                     <div className="grid gap-4 md:grid-cols-6 mb-8">
             <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Käyttäjiä yhteensä</CardTitle>
                 <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">{profiles.length}</div>
               </CardContent>
             </Card>
             <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Järjestelmänvalvojia</CardTitle>
                 <Shield className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">{adminUsers}</div>
               </CardContent>
             </Card>
             <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Tavallisia käyttäjiä</CardTitle>
                 <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">{regularUsers}</div>
               </CardContent>
             </Card>
             <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Odottavia tilauksia</CardTitle>
                 <Clock className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">{pendingOrders}</div>
               </CardContent>
             </Card>
             <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Vahvistettuja tilauksia</CardTitle>
                 <Package className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">{confirmedOrders}</div>
               </CardContent>
             </Card>
             <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Vahvistustapahtumia</CardTitle>
                 <CheckCircle className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">{totalConfirmations}</div>
               </CardContent>
             </Card>
           </div>

                     <Tabs defaultValue="users" className="space-y-4">
             <TabsList>
               <TabsTrigger value="users">Käyttäjät</TabsTrigger>
               <TabsTrigger value="orders">Tilaukset</TabsTrigger>
               <TabsTrigger value="confirmations">Vahvistuslogi</TabsTrigger>
             </TabsList>
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Käyttäjien hallinta
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Luo uusi käyttäjä
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Luo uusi käyttäjä</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateUser} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="firstName">Etunimi</Label>
                              <Input id="firstName" name="firstName" />
                            </div>
                            <div>
                              <Label htmlFor="lastName">Sukunimi</Label>
                              <Input id="lastName" name="lastName" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="email">Sähköposti</Label>
                            <Input id="email" name="email" type="email" required />
                          </div>
                          <div>
                            <Label htmlFor="password">Salasana</Label>
                            <Input id="password" name="password" type="password" required />
                          </div>
                          <div>
                            <Label htmlFor="role">Rooli</Label>
                            <select id="role" name="role" defaultValue="user" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                              <option value="user">Käyttäjä</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                              Peruuta
                            </Button>
                            <Button type="submit" disabled={loading}>
                              {loading ? "Luodaan..." : "Luo käyttäjä"}
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                                     </CardTitle>
                 </CardHeader>
                 <CardContent>
                    {/* Hakukenttä käyttäjille */}
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Hae käyttäjiä nimellä tai sähköpostilla..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto border rounded-lg shadow-sm">
                     <div className="min-w-[800px] p-1">
                       <Table>
                         <TableHeader>
                           <TableRow>
                             <TableHead className="w-[200px]">Nimi</TableHead>
                             <TableHead className="w-[200px]">Sähköposti</TableHead>
                             <TableHead className="w-[120px]">Rooli</TableHead>
                             <TableHead className="w-[120px]">Luotu</TableHead>
                             <TableHead className="w-[100px]">Toiminnot</TableHead>
                           </TableRow>
                         </TableHeader>
                                                   <TableBody>
                            {filteredProfiles.map((profile) => (
                             <TableRow key={profile.id}>
                               <TableCell className="font-medium">
                                 {profile.first_name && profile.last_name 
                                   ? `${profile.first_name} ${profile.last_name}`
                                   : profile.email}
                               </TableCell>
                               <TableCell>{profile.email}</TableCell>
                               <TableCell>
                                 <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'}>
                                   {profile.role === 'admin' ? 'Admin' : 'Käyttäjä'}
                                 </Badge>
                               </TableCell>
                               <TableCell>
                                 {new Date(profile.created_at).toLocaleDateString('fi-FI')}
                               </TableCell>
                               <TableCell>
                                 <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(profile.user_id)}>
                                   Poista
                                 </Button>
                               </TableCell>
                             </TableRow>
                                                       ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      {/* Tyhjän hakutuloksen viesti */}
                      {filteredProfiles.length === 0 && searchTerm && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">Ei hakutuloksia käyttäjille.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Tilausten hallinta
                  </CardTitle>
                </CardHeader>
                                 <CardContent>
                   <Tabs defaultValue="pending" className="w-full">
                                           <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="pending" className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Vahvistamattomat ({filteredOrders.filter(o => o.status === 'pending').length})
                        </TabsTrigger>
                        <TabsTrigger value="confirmed" className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Vahvistetut ({filteredOrders.filter(o => o.status === 'confirmed').length})
                        </TabsTrigger>
                      </TabsList>
                      
                      {/* Hakukenttä */}
                      <div className="mt-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Hae tilausnumerolla, asiakastiedoilla tai myyjän tiedoilla..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-200">
                        💡 <strong>Klikkaa tilauksesta</strong> nähdäksesi kaikki asiakastiedot ja laskutustiedot
                      </div>
                    
                                                                                    <TabsContent value="pending" className="mt-6">
                        {filteredOrders.filter(o => o.status === 'pending').length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              {searchTerm ? 'Ei hakutuloksia vahvistamattomille tilauksille.' : 'Ei vahvistamattomia tilauksia.'}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {filteredOrders.filter(o => o.status === 'pending').map((order) => (
                                <div key={order.id} className="border rounded-lg p-4 bg-white shadow-sm">
                                  {/* Pääraja */}
                                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleOrderExpansion(order.id)}>
                                    <div className="flex items-center space-x-4">
                                      <div className="font-medium text-sm">
                                        Tilaus: {order.order_number || order.id.slice(0, 6)}
                                      </div>
                                      <div className="text-sm">
                                        {order.customer_name}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {order.customer_email}
                                      </div>
                                      <div className="text-sm font-medium">
                                        {Number(order.total_amount).toFixed(2)} €
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {new Date(order.created_at).toLocaleDateString('fi-FI')}
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant={getStatusVariant(order)} className="flex items-center gap-1 w-fit text-xs">
                                        {getStatusIcon(order)}
                                        {getStatusText(order)}
                                      </Badge>
                                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedOrders[order.id] ? 'rotate-180' : ''}`} />
                                    </div>
                                  </div>
                                  
                                  {/* Laajennettu sisältö */}
                                  {expandedOrders[order.id] && (
                                    <div className="mt-4 pt-4 border-t space-y-4">
                                      {/* Asiakastiedot */}
                                      <div>
                                        <h4 className="font-medium text-sm mb-2">Asiakastiedot</h4>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                          <div>
                                            <span className="font-medium">Nimi:</span> {order.customer_name}
                                          </div>
                                          <div>
                                            <span className="font-medium">Sähköposti:</span> {order.customer_email}
                                          </div>
                                          {order.customer_phone && (
                                            <div>
                                              <span className="font-medium">Puhelin:</span> {order.customer_phone}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      
                                      {/* Laskutustiedot */}
                                      {order.billing_address && (
                                        <div>
                                          <h4 className="font-medium text-sm mb-2">Laskutustiedot</h4>
                                          <div className="text-sm">
                                            <div>{order.billing_address.address}</div>
                                            <div>{order.billing_address.postalCode} {order.billing_address.city}</div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Tilaaja */}
                                      <div>
                                        <h4 className="font-medium text-sm mb-2">Tilaaja</h4>
                                        <div className="text-sm">
                                          {order.profiles ? (
                                            <>
                                              <div>
                                                {order.profiles.first_name && order.profiles.last_name 
                                                  ? `${order.profiles.first_name} ${order.profiles.last_name}`
                                                  : order.profiles.email}
                                              </div>
                                              {order.profiles.first_name && order.profiles.last_name && (
                                                <div className="text-muted-foreground">{order.profiles.email}</div>
                                              )}
                                            </>
                                          ) : (
                                            <div className="text-muted-foreground">Käyttäjätietoja ei löydy</div>
                                          )}
                                        </div>
                                      </div>
                                      
                                      {/* Vahvistusyritykset (jos on) */}
                                      {order.order_confirmations && order.order_confirmations.length > 0 && (
                                        <div>
                                          <h4 className="font-medium text-sm mb-2">Vahvistusyritykset</h4>
                                          <div className="space-y-2 text-sm">
                                            {order.order_confirmations.map((confirmation, index) => (
                                              <div key={index} className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                                <div className="grid grid-cols-2 gap-2">
                                                  <div>
                                                    <span className="font-medium">Yritys:</span> {new Date(confirmation.created_at).toLocaleString('fi-FI')}
                                                  </div>
                                                  {confirmation.ip_address && (
                                                    <div>
                                                      <span className="font-medium">IP-osoite:</span> {confirmation.ip_address}
                                                    </div>
                                                  )}
                                                  {confirmation.user_agent && (
                                                    <div className="col-span-2">
                                                      <span className="font-medium">Selain:</span> {confirmation.user_agent}
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Tuotteet */}
                                      <div>
                                        <h4 className="font-medium text-sm mb-2">Tuotteet</h4>
                                        <div className="space-y-1">
                                          {order.order_items.map((item, index) => (
                                            <div key={index} className="text-sm">
                                              {item.quantity}x {item.package_title} - {Number(item.package_price).toFixed(2)} €
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                        )}
                      </TabsContent>
                    
                                                                                    <TabsContent value="confirmed" className="mt-6">
                        {filteredOrders.filter(o => o.status === 'confirmed').length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              {searchTerm ? 'Ei hakutuloksia vahvistetuille tilauksille.' : 'Ei vahvistettuja tilauksia.'}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {filteredOrders.filter(o => o.status === 'confirmed').map((order) => (
                                <div key={order.id} className="border rounded-lg p-4 bg-white shadow-sm">
                                  {/* Pääraja */}
                                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleOrderExpansion(order.id)}>
                                    <div className="flex items-center space-x-4">
                                      <div className="font-medium text-sm">
                                        Tilaus: {order.order_number || order.id.slice(0, 6)}
                                      </div>
                                      <div className="text-sm">
                                        {order.customer_name}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {order.customer_email}
                                      </div>
                                      <div className="text-sm font-medium">
                                        {Number(order.total_amount).toFixed(2)} €
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Vahvistettu: {order.confirmed_at 
                                          ? new Date(order.confirmed_at).toLocaleString('fi-FI')
                                          : '-'
                                        }
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant={getStatusVariant(order)} className="flex items-center gap-1 w-fit text-xs">
                                        {getStatusIcon(order)}
                                        {getStatusText(order)}
                                      </Badge>
                                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedOrders[order.id] ? 'rotate-180' : ''}`} />
                                    </div>
                                  </div>
                                  
                                  {/* Laajennettu sisältö */}
                                  {expandedOrders[order.id] && (
                                    <div className="mt-4 pt-4 border-t space-y-4">
                                      {/* Asiakastiedot */}
                                      <div>
                                        <h4 className="font-medium text-sm mb-2">Asiakastiedot</h4>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                          <div>
                                            <span className="font-medium">Nimi:</span> {order.customer_name}
                                          </div>
                                          <div>
                                            <span className="font-medium">Sähköposti:</span> {order.customer_email}
                                          </div>
                                          {order.customer_phone && (
                                            <div>
                                              <span className="font-medium">Puhelin:</span> {order.customer_phone}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      
                                      {/* Laskutustiedot */}
                                      {order.billing_address && (
                                        <div>
                                          <h4 className="font-medium text-sm mb-2">Laskutustiedot</h4>
                                          <div className="text-sm">
                                            <div>{order.billing_address.address}</div>
                                            <div>{order.billing_address.postalCode} {order.billing_address.city}</div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Tilaaja */}
                                      <div>
                                        <h4 className="font-medium text-sm mb-2">Tilaaja</h4>
                                        <div className="text-sm">
                                          {order.profiles ? (
                                            <>
                                              <div>
                                                {order.profiles.first_name && order.profiles.last_name 
                                                  ? `${order.profiles.first_name} ${order.profiles.last_name}`
                                                  : order.profiles.email}
                                              </div>
                                              {order.profiles.first_name && order.profiles.last_name && (
                                                <div className="text-muted-foreground">{order.profiles.email}</div>
                                              )}
                                            </>
                                          ) : (
                                            <div className="text-muted-foreground">Käyttäjätietoja ei löydy</div>
                                          )}
                                        </div>
                                      </div>
                                      
                                      {/* Vahvistusajankohta */}
                                      <div>
                                        <h4 className="font-medium text-sm mb-2">Vahvistusajankohta</h4>
                                        <div className="text-sm">
                                          {order.confirmed_at 
                                            ? new Date(order.confirmed_at).toLocaleString('fi-FI')
                                            : 'Ei vahvistettu'
                                          }
                                        </div>
                                      </div>
                                      
                                      {/* Vahvistustiedot */}
                                      {order.order_confirmations && order.order_confirmations.length > 0 && (
                                        <div>
                                          <h4 className="font-medium text-sm mb-2">Vahvistustiedot</h4>
                                          <div className="space-y-2 text-sm">
                                            {order.order_confirmations.map((confirmation, index) => (
                                              <div key={index} className="bg-gray-50 p-3 rounded-lg border">
                                                <div className="grid grid-cols-2 gap-2">
                                                  <div>
                                                    <span className="font-medium">Vahvistettu:</span> {new Date(confirmation.confirmed_at).toLocaleString('fi-FI')}
                                                  </div>
                                                  {confirmation.ip_address && (
                                                    <div>
                                                      <span className="font-medium">IP-osoite:</span> {confirmation.ip_address}
                                                    </div>
                                                  )}
                                                  {confirmation.user_agent && (
                                                    <div className="col-span-2">
                                                      <span className="font-medium">Selain:</span> {confirmation.user_agent}
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Tuotteet */}
                                      <div>
                                        <h4 className="font-medium text-sm mb-2">Tuotteet</h4>
                                        <div className="space-y-1">
                                          {order.order_items.map((item, index) => (
                                            <div key={index} className="text-sm">
                                              {item.quantity}x {item.package_title} - {Number(item.package_price).toFixed(2)} €
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                        )}
                      </TabsContent>
                  </Tabs>
                </CardContent>
                             </Card>
             </TabsContent>
             
             <TabsContent value="confirmations">
               <Card>
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2">
                     <CheckCircle className="h-5 w-5" />
                     Vahvistuslogi
                   </CardTitle>
                 </CardHeader>
                                   <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      Kaikki vahvistusyritykset ja -tapahtumat järjestelmässä
                    </div>
                    
                    {/* Hakukenttä vahvistuslogiin */}
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Hae vahvistuslogista tilausnumerolla, asiakastiedoilla tai myyjän tiedoilla..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                                        <div className="space-y-3">
                      {filteredOrders
                        .filter(order => order.order_confirmations && order.order_confirmations.length > 0)
                        .flatMap(order => 
                          order.order_confirmations!.map((confirmation, index) => ({
                            order,
                            confirmation,
                            key: `${order.id}-${index}`
                          }))
                        )
                        .sort((a, b) => new Date(b.confirmation.created_at).getTime() - new Date(a.confirmation.created_at).getTime())
                        .map(({ order, confirmation, key }) => (
                         <div key={key} className="border rounded-lg p-4 bg-white shadow-sm">
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                             <div>
                               <span className="font-medium">Tilaus:</span> {order.order_number || order.id.slice(0, 6)}
                             </div>
                             <div>
                               <span className="font-medium">Asiakas:</span> {order.customer_name}
                             </div>
                             <div>
                               <span className="font-medium">Aika:</span> {new Date(confirmation.created_at).toLocaleString('fi-FI')}
                             </div>
                             {confirmation.ip_address && (
                               <div>
                                 <span className="font-medium">IP-osoite:</span> {confirmation.ip_address}
                               </div>
                             )}
                             {confirmation.user_agent && (
                               <div className="md:col-span-2">
                                 <span className="font-medium">Selain:</span> {confirmation.user_agent}
                               </div>
                             )}
                           </div>
                         </div>
                       ))}
                     
                                           {filteredOrders.filter(order => order.order_confirmations && order.order_confirmations.length > 0).length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            {searchTerm ? 'Ei hakutuloksia vahvistuslogista.' : 'Ei vahvistustapahtumia.'}
                          </p>
                        </div>
                      )}
                   </div>
                 </CardContent>
               </Card>
             </TabsContent>
           </Tabs>
         </div>
       </div>
     </div>
   );
 };
 
 export default AdminPortal;