import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tvrztmzxwzxvtgpnrinm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2cnp0bXp4d3p4dnRncG5yaW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMDc2MTMsImV4cCI6MjAyMDc4MzYxM30.Dlu3IHHtj9knDmvn5TiX38zGeaSK9Uw7IBK--NBvzYA'
export const supabase = createClient(supabaseUrl, supabaseKey)