-- Remove overly permissive public SELECT policy on profiles to protect phone numbers
DROP POLICY IF EXISTS "Public can view limited profile info" ON public.profiles;

-- Ensure RLS remains enabled (no-op if already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Keep existing owner-only SELECT policy intact. If it doesn't exist, (re)create it for safety
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'profiles' 
      AND policyname = 'Users can view their own profile'
  ) THEN
    CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Note: Public profile access should use the existing SECURITY DEFINER function
-- get_public_profile(profile_user_id uuid) which only returns non-sensitive fields.
