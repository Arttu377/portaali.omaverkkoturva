import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: { first_name?: string; last_name?: string }) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
      
      return data?.role || null;
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer role fetching with setTimeout
          setTimeout(async () => {
            const role = await fetchUserRole(session.user.id);
            setUserRole(role);
          }, 0);
        } else {
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const role = await fetchUserRole(session.user.id);
          setUserRole(role);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Kirjautuminen epäonnistui",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Kirjautuminen onnistui",
          description: "Tervetuloa takaisin!",
        });
        // Redirect to dashboard after successful login
        window.location.href = '/dashboard';
      }

      return { error };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Tuntematon virhe';
      toast({
        title: "Kirjautuminen epäonnistui",
        description: message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, userData: { first_name?: string; last_name?: string }) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: userData
        }
      });

      if (error) {
        toast({
          title: "Rekisteröityminen epäonnistui",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Rekisteröityminen onnistui",
          description: "Tarkista sähköpostisi vahvistuslinkin takia.",
        });
      }

      return { error };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Tuntematon virhe';
      toast({
        title: "Rekisteröityminen epäonnistui",
        description: message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Uloskirjautuminen epäonnistui",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Uloskirjautunut",
          description: "Olet kirjautunut ulos onnistuneesti.",
        });
        // Ohjataan etusivulle uloskirjautumisen jälkeen
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Uloskirjautuminen epäonnistui",
        description: "Tuntematon virhe",
        variant: "destructive",
      });
    }
  };

  const isAdmin = userRole === 'admin';

  const value: AuthContextType = {
    user,
    session,
    userRole,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};