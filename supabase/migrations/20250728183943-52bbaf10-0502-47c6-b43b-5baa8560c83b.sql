-- Allow unauthenticated users to read orders by confirmation token
CREATE POLICY "Anyone can read orders by confirmation token" 
ON public.orders 
FOR SELECT 
USING (confirmation_token IS NOT NULL);

-- Allow unauthenticated users to update orders by confirmation token
CREATE POLICY "Anyone can update orders by confirmation token" 
ON public.orders 
FOR UPDATE 
USING (confirmation_token IS NOT NULL);

-- Allow unauthenticated users to insert order confirmations
CREATE POLICY "Anyone can insert order confirmations" 
ON public.order_confirmations 
FOR INSERT 
WITH CHECK (true);