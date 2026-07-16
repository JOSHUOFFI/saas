import { createBrowserClient } from '@supabase/ssr'

export function createClient(p0: string, p1: string, p2: { accessToken(): Promise<any> }) {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
