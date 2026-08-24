import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qukvnzbhnblyukkuhmwa.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1a3ZuemJobmJseXVra3VobXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczODU3NTYsImV4cCI6MjEwMjk2MTc1Nn0.yNQ0oy4uC0BBHtDrzYx97-tyQc3L_5U082r9tM5Ilgs';

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
