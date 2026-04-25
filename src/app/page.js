import { createClient } from '../utils/supabase/server';
import HomeContent from './HomeContent';

export default async function HomePage() {
  const supabase = await createClient();

  try {
    const [personajesRes, hechizosRes, casasRes, librosRes] = await Promise.all([
      supabase.from('personajes').select('*'),
      supabase.from('hechizos').select('*'),
      supabase.from('casas').select('*'),
      supabase.from('libros').select('*')
    ]);

    const personajesData = personajesRes.data || [];
    const hechizosData = hechizosRes.data || [];
    const casasData = casasRes.data || [];
    const librosData = librosRes.data || [];

    return (
      <HomeContent 
        personajesData={personajesData}
        hechizosData={hechizosData}
        casasData={casasData}
        librosData={librosData}
      />
    );
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return (
      <div className="text-center py-20 bg-hogwarts-stone min-h-screen">
        <h1 className="text-4xl font-harry text-red-500 mb-4">Error al cargar la magia</h1>
        <p className="text-hogwarts-parchment italic">Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }
}