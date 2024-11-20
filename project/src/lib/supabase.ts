import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgfqfydzfqoklfhqkbzc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZnFmeWR6ZnFva2xmaHFrYnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMTMyMzMsImV4cCI6MjA0NzY4OTIzM30.aIY0XJ2HeYJcvKneaKtZD1z3YFKJ8MBTlHHnFEntnDQ';

export const supabase = createClient(supabaseUrl, supabaseKey);