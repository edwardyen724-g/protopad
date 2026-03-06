import { withAuth } from 'next-auth/middleware';
import NextAuth from 'next-auth';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

export default nextConfig;