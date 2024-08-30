import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "";
const supabaseKey = process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : "";

export const database = createClient(supabaseUrl, supabaseKey);