import { createClient } from '../../../utils/supabase/server';
import Divider from '../../../components/ui/Divider';
import LibrosGrid from './LibrosGrid';

export default async function LibrosPage() {
  const supabase = await createClient();

  // Obtenemos todos los datos necesarios en paralelo para las relaciones
  const [librosRes, peliculasRes, hechizosRes, personajesRes] = await Promise.all([
    supabase.from('libros').select('*').order('libro', { ascending: true }),
    supabase.from('peliculas').select('*'),
    supabase.from('hechizos').select('*'),
    supabase.from('personajes').select('*, casas(nombre), rol(rol)')
  ]);

  const libros = librosRes.data || [];
  const peliculas = peliculasRes.data || [];
  const hechizos = hechizosRes.data || [];
  const personajes = personajesRes.data || [];

  if (librosRes.error) {
    console.error('Error al cargar libros:', librosRes.error);
    return (
      <div className="min-h-screen bg-hogwarts-stone flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-harry text-red-600 mb-4">¡Expelliarmus!</h1>
          <p className="text-hogwarts-parchment italic">No pudimos abrir los libros prohibidos.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-hogwarts-stone py-16">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-harry text-gryffindor-secondary mb-4 drop-shadow-md">
            Biblioteca de Hogwarts
          </h1>
          <p className="text-hogwarts-parchment italic text-xl max-w-2xl mx-auto">
            "No hay nada como un buen libro, especialmente si es uno que te enseña a convertir a tu enemigo en un tejón."
          </p>
        </div>

        <Divider text="Los Siete Libros" variant="gryffindor" />

        {/* Grid de Libros (Componente de Cliente para manejar el Modal) */}
        <LibrosGrid 
          libros={libros} 
          peliculas={peliculas} 
          hechizos={hechizos} 
          personajes={personajes} 
        />

        {/* Mensaje si no hay libros */}
        {libros?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-hogwarts-parchment text-2xl italic">La biblioteca parece estar vacía... ¿Habrá usado alguien el encantamiento Evanesco?</p>
          </div>
        )}
      </div>
    </main>
  );
}
