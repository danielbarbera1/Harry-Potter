import { createClient } from '../../../utils/supabase/server';
import Card from '../../../components/ui/Card';
import Divider from '../../../components/ui/Divider';

export default async function LibrosPage() {
  const supabase = await createClient();

  // Obtenemos todos los libros de la base de datos
  const { data: libros, error } = await supabase
    .from('libros')
    .select('*')
    .order('libro', { ascending: true }); // Los ordenamos por nombre

  if (error) {
    console.error('Error al cargar libros:', error);
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

        {/* Grid de Libros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {libros?.map((libro) => (
            <div key={libro.id} className="flex justify-center">
              <Card
                titulo={libro.libro}
                subtitulo="Escrito por J.K. Rowling"
                imagen={libro.imagen_url}
                variant="gryffindor" // Usamos el tema de Gryffindor para los libros
              >
                <div className="mt-4">
                  <p className="text-sm text-hogwarts-parchment opacity-80 line-clamp-3">
                    Sumérgete en la historia que cambió el mundo mágico para siempre. 
                    Un ejemplar imprescindible en cualquier estantería de mago.
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

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
