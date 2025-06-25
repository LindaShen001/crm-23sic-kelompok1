import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tdwlwhyenlcwagxjcwzq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkd2x3aHllbmxjd2FneGpjd3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNzcwNjksImV4cCI6MjA2NTk1MzA2OX0.PcPuvmrY6yhhteL7-3OqaBAw9dARJxUxaSrYcYw7ejE'
export const supabase = createClient(supabaseUrl, supabaseKey)