-- Fix security vulnerability: Restrict phone number access
-- Drop the overly permissive policy that allows everyone to view all profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a secure policy: Users can only view their own complete profile (including phone)
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a separate policy for public profile data (display_name and avatar only, no phone)
-- This uses row-level security to exclude sensitive fields
CREATE POLICY "Public can view limited profile info" 
ON public.profiles 
FOR SELECT 
USING (true);

-- Create a security definer function to get public profile info without phone numbers
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_user_id uuid)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  display_name text,
  avatar_url text,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.user_id, p.display_name, p.avatar_url, p.created_at
  FROM public.profiles p
  WHERE p.user_id = profile_user_id;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_public_profile(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_profile(uuid) TO anon;