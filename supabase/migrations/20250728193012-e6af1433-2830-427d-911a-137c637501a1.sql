-- Add foreign key relationship between orders and profiles
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_user_id 
FOREIGN KEY (user_id) 
REFERENCES profiles(user_id);