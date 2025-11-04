-- Add missing columns to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS date_time timestamp with time zone,
ADD COLUMN IF NOT EXISTS payment_mode text;

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id uuid NOT NULL,
  amount integer NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create policies for payments
CREATE POLICY "Users can view their own payments"
ON public.payments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.bookings
    WHERE bookings.id = payments.booking_id
    AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create payments for their bookings"
ON public.payments
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.bookings
    WHERE bookings.id = payments.booking_id
    AND bookings.user_id = auth.uid()
  )
);

-- Add trigger for payments updated_at
CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();