import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Asegúrate que en tu .env estas variables se llamen EXACTAMENTE así
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug: Verifica que las variables existen
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Cargada ✅' : 'No cargada ❌');

export const createClient = async () => {
  const cookieStore = await cookies();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Faltan las variables de entorno de Supabase. Revisa tu archivo .env.local');
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Las cookies de servidor no se pueden setear en Server Components
          }
        },
      },
    }
  )
}