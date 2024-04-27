import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://iaxsfaabycanrdbaimmr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheHNmYWFieWNhbnJkYmFpbW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0OTE0MDcsImV4cCI6MjAyNDA2NzQwN30.h8BTIdLBVp2FyCj16fyjfqftp7FxpPsVsmFQSSsLSuI'
)
