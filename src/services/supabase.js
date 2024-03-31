
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://dhyvltujiknizorixzvn.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoeXZsdHVqaWtuaXpvcml4enZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3NTg5NDIsImV4cCI6MjAyNzMzNDk0Mn0.K5D8DWxNmgiEuqEDNSGBcJty64L2rIxwjKaG7hRygds"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;