-- Tighten RLS on orders: remove overly-broad public policies

-- Drop unsafe policies if they exist
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'orders' AND policyname = 'Anyone can read orders by confirmation token'
  ) THEN
    EXECUTE 'DROP POLICY "Anyone can read orders by confirmation token" ON public.orders';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'orders' AND policyname = 'Anyone can update orders by confirmation token'
  ) THEN
    EXECUTE 'DROP POLICY "Anyone can update orders by confirmation token" ON public.orders';
  END IF;
END $$;

-- Keep existing safe policies (users see own orders; admins see all) defined in earlier migrations



