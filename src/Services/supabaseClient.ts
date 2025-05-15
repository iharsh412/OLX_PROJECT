import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dsqgdnfqbxcenmhzpdvp.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcWdkbmZxYnhjZW5taHpwZHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyODY4MTYsImV4cCI6MjA2Mjg2MjgxNn0.xx75K9mk3Wb5K7S_04V62Jm9zGfKqnDCfGWbMIkr3-M';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
