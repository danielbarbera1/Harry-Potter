"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import Button from '../../../components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciales inválidas. Por favor, intenta nuevamente.');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-hogwarts-stone flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-hogwarts-wood/10 p-10 rounded-2xl border-2 border-gryffindor-secondary shadow-2xl backdrop-blur-sm">
        <div>
          <h2 className="mt-6 text-center text-4xl font-harry text-gryffindor-secondary">
            Entrar a Hogwarts
          </h2>
          <p className="mt-2 text-center text-sm text-hogwarts-parchment italic">
            "Palabras mágicas: Alohomora"
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="text-hogwarts-parchment text-sm font-bold mb-1 block">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gryffindor-secondary/30 placeholder-gray-500 text-white bg-black/40 rounded-lg focus:outline-none focus:ring-gryffindor-primary focus:border-gryffindor-primary sm:text-sm"
                placeholder="mago@hogwarts.com"
              />
            </div>
            <div>
              <label className="text-hogwarts-parchment text-sm font-bold mb-1 block">Contraseña</label>
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
              Lanzar hechizo de entrada
            </Button>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-hogwarts-parchment text-sm">
              ¿Aún no tienes plaza en Hogwarts?{' '}
              <button 
                type="button"
                onClick={() => router.push('/register')}
                className="text-gryffindor-secondary font-bold hover:underline"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}