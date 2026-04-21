"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import Button from '../../../components/ui/Button';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message || 'Hubo un error al registrarse. Por favor, intenta nuevamente.');
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-hogwarts-stone flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-hogwarts-wood/10 p-10 rounded-2xl border-2 border-gryffindor-secondary shadow-2xl backdrop-blur-sm">
        <div>
          <h2 className="mt-6 text-center text-4xl font-harry text-gryffindor-secondary">
            Registro en Hogwarts
          </h2>
          <p className="mt-2 text-center text-sm text-hogwarts-parchment italic">
            "No son nuestras habilidades las que muestran quiénes somos, sino nuestras elecciones."
          </p>
        </div>

        {success ? (
          <div className="bg-green-900/30 border border-green-500 text-green-200 p-4 rounded-lg text-center animate-pulse">
            ✨ ¡Lechuza enviada! Revisa tu correo para confirmar tu ingreso a Hogwarts. 
            Redirigiendo...
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label className="text-hogwarts-parchment text-sm font-bold mb-1 block">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gryffindor-secondary/30 placeholder-gray-500 text-white bg-black/40 rounded-lg focus:outline-none focus:ring-gryffindor-primary focus:border-gryffindor-primary sm:text-sm"
                  placeholder="harry.potter@hogwarts.com"
                />
              </div>
              <div>
                <label className="text-hogwarts-parchment text-sm font-bold mb-1 block">Contraseña Mágica</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gryffindor-secondary/30 placeholder-gray-500 text-white bg-black/40 rounded-lg focus:outline-none focus:ring-gryffindor-primary focus:border-gryffindor-primary sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center italic font-bold">
                🏮 {error}
              </div>
            )}

            <div>
              <Button type="submit" variant="gryffindor" fullWidth>
                Firmar el Libro de Registro
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-hogwarts-parchment text-sm">
                ¿Ya tienes una cuenta?{' '}
                <button 
                  onClick={() => router.push('/login')}
                  className="text-gryffindor-secondary font-bold hover:underline"
                >
                  Entra aquí
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}