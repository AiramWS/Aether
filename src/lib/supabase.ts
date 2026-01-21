import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://hvlzjtetnuwgocymhavv.supabase.co';
const supabaseKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2bHpqdGV0bnV3Z29jeW1oYXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNzA3NDEsImV4cCI6MjA3Nzk0Njc0MX0.v2a6nr_7kHFj4kGJi8V5oU2GZ81QT9D3j70kXuCTqgo';

export const supabase  = createClient(supabaseURL, supabaseKEY);