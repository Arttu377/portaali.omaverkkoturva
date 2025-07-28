-- Update the admin policy to use the has_role function properly
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;

CREATE POLICY "Admins can view all orders" 
ON orders 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));