'use client'
import { useState } from 'react'
import { supabase } from '@/app/utils/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // La función clave es signInWithPassword, que es la forma recomendada de iniciar sesión con email y contraseña en Supabase
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({// Aquí van las credenciales
      email,
      password,
    })

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('¡Bienvenido, Guerrero!!')
      router.push('/') // Nos manda al home al terminar
      router.refresh() // Refresca para actualizar el estado de la sesión
    }
    setLoading(false)
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0] p-4">
      <div className="w-full max-w-md bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 italic">
        <h2 className="text-4xl font-black text-[#5088C5] uppercase mb-8 [text-shadow:3px_3px_0px_#000] tracking-tighter">
          ENTRAR AL <span className="text-[#E31F26]">COMBATE</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-black text-black uppercase mb-1">Tu Correo de Guerrero</label>
            <input
              type="email"
              placeholder="goku@capsulecorp.com"
              className="w-full border-4 text-black border-black p-3 font-bold outline-none focus:bg-[#FCEE21] transition-colors shadow-[4px_4px_0px_0px_#000]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-black text-black uppercase mb-1">Contraseña Ki</label>
            <input
              type="password"
              placeholder="Tu poder secreto para el combate"
              className="w-full border-4 text-black border-black p-3 font-bold outline-none focus:bg-[#FCEE21] transition-colors shadow-[4px_4px_0px_0px_#000]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E31F26] border-4 border-black py-4 text-white font-black uppercase text-xl shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            {loading ? 'CARGANDO KI...' : 'ELEVAR PODER (LOGIN)'}
          </button>
        </form>

        <p className="mt-6 font-bold text-center text-black ">
          ¿No tienes cuenta? <a href="/register" className="text-[#5088C5] underline decoration-4">¡Únete al Torneo!</a>
        </p>
      </div>
    </div>
  )
}