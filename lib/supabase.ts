import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and keys from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Admin {
  id: string
  email: string
  created_at: string
}
