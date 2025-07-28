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
import { Users, UserPlus, Shield, Package, CheckCircle, Clock } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

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
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
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

const AdminPortal = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
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
  }, [toast]);

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

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
        },
        email_confirm: true
      });

      if (error) throw error;

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
        description: "Käyttäjän luominen epäonnistui.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const adminUsers = profiles.filter(profile => profile.role === 'admin').length;
  const regularUsers = profiles.filter(profile => profile.role === 'user').length;
  const pendingOrders = orders.filter(order => !order.confirmed_at).length;
  const confirmedOrders = orders.filter(order => order.confirmed_at).length;

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

  if (isLoading) {
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
          <Shield className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Admin Portaali</h1>
        </div>
        
        <div className="grid gap-4 md:grid-cols-5 mb-8">
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
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Käyttäjät</TabsTrigger>
            <TabsTrigger value="orders">Tilaukset</TabsTrigger>
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
                <div className="space-y-4">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">
                          {profile.first_name && profile.last_name 
                            ? `${profile.first_name} ${profile.last_name}`
                            : profile.email}
                        </div>
                        <div className="text-sm text-muted-foreground">{profile.email}</div>
                        <div className="text-xs text-muted-foreground">
                          Luotu: {new Date(profile.created_at).toLocaleDateString('fi-FI')}
                        </div>
                      </div>
                      <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'}>
                        {profile.role === 'admin' ? 'Admin' : 'Käyttäjä'}
                      </Badge>
                    </div>
                  ))}
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
                              {order.customer_phone && (
                                <div className="text-sm text-muted-foreground">{order.customer_phone}</div>
                              )}
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
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminPortal;