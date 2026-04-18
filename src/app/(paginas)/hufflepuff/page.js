`use client`;
import Hero from '../../components/ui/Hero';
import Card from '../../components/ui/Card';
import Divider from '../../components/ui/Divider';
import { createClient } from '../../utils/supabase/server';

export default async function HufflepuffPage() {
  const supabase = await createClient();

  // Obtener datos de personajes de Hufflepuff
  const { data: personajes, error } = await supabase
    .from('personajes')
    .select('*')
    .eq('casa', 'Hufflepuff');

  if (error) {
    console.error('Error al obtener personajes de Hufflepuff:', error);
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-red-500">Error al cargar los datos</h1>
        <p className="text-gray-500">Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }

  return (
    <>
      <Hero
        title="Casa Hufflepuff"
        subtitle="Lealtad, paciencia y trabajo duro"
        description="Descubre a los personajes más destacados de la casa Hufflepuff."
        backgroundImage="/img/hufflepuff-banner.jpg"
        variant="hufflepuff"
      />

      <section className="py-16 bg-gradient-to-b from-yellow-700 to-yellow-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-harry text-4xl text-yellow-400 mb-2">Personajes de Hufflepuff</h2>
            <Divider text="Los más leales" variant="hufflepuff" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personajes.map((personaje) => (
              <Card
                key={personaje.id}
                titulo={personaje.nombre}
                subtitulo={`Rol: ${personaje.rol}`}
                imagen={personaje.imagen_url}
                variant="hufflepuff"
              >
                <p>{personaje.descripcion}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}