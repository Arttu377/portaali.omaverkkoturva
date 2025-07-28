-- Add a 6-digit order number column to orders table
ALTER TABLE public.orders ADD COLUMN order_number TEXT;

-- Create a function to generate 6-digit order numbers
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN LPAD((100000 + (RANDOM() * 899999)::INTEGER)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Update existing orders with order numbers
UPDATE public.orders 
SET order_number = public.generate_order_number() 
WHERE order_number IS NULL;

-- Create a trigger to automatically generate order numbers for new orders
CREATE OR REPLACE FUNCTION public.set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := public.generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number_trigger
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.set_order_number();