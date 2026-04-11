'use client'
import { useState } from 'react'
import { supabase } from '@/app/utils/supabase'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // La función clave es signUp, que es la forma recomendada de registrar un nuevo usuario con email y contraseña en Supabase
  const handleRegister = async (e) => {
    e.preventDefault()// Esto evita que la página se recargue al enviar el formulario
    setLoading(true)

    // La función clave es signUp
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Esto es opcional, pero ayuda a redirigir al usuario después de confirmar
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      alert('Error al crear cuenta: ' + error.message)
    } else {
      alert('¡Guerrero registrado! Revisa tu correo.')
      router.push('/login')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0] p-4">
      <div className="w-full max-w-md bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 italic">
        <h2 className="text-4xl font-black text-[#E31F26] uppercase mb-8 [text-shadow:3px_3px_0px_#000] tracking-tighter">
          NUEVO <span className="text-[#5088C5]">GUERRERO</span>
        </h2>


        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block font-black text-black uppercase mb-1">Nombre / Nickname</label>
            <input
              type="text"
              placeholder="Ej: Veggie77"
              className="w-full border-4 border-black text-black p-3 font-bold outline-none focus:bg-[#FCEE21] shadow-[4px_4px_0px_0px_#000]"
            />
          </div>

          <div>
            <label className="block font-black text-black uppercase mb-1">Raza (Saiyajin, Humano...)</label>
            <select className="w-full border-4 border-black text-black p-3 font-bold outline-none focus:bg-[#FCEE21] shadow-[4px_4px_0px_0px_#000] appearance-none">
              <option>Saiyajin</option>
              <option>Humano</option>
              <option>Namekusei</option>
            </select>
          </div>

          <div>
            <label className="block font-black text-black uppercase mb-1">Correo Electrónico</label>
            <input
              type="email"
              placeholder="bulma@capsulecorp.com"
              className="w-full border-4 border-black  p-3 font-bold outline-none focus:bg-[#FCEE21] shadow-[4px_4px_0px_0px_#000]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>

          <div>
            <label className="block font-black text-black uppercase mb-1">Contraseña secreta</label>
            <input
              type="password"
              placeholder="Tu poder secreto para el combate"
              className="w-full border-4 border-black p-3 font-bold outline-none focus:bg-[#FCEE21] shadow-[4px_4px_0px_0px_#000] text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5088C5] border-4 border-black py-4 text-white font-black uppercase text-xl shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all mt-4">
            REGISTRARME EN LA CAPSULE CORP.
          </button>
        </form>
      </div>
    </div>
  )
}