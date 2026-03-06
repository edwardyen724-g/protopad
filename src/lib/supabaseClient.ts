import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('your-supabase-url', 'your-anon-key');