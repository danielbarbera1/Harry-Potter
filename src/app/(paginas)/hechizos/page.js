import { createClient } from '../../../utils/supabase/server';
import Card from '../../../components/ui/Card';
import Divider from '../../../components/ui/Divider';

export default async function HechizosPage() {
  const supabase = await createClient();

  const { data: hechizosData, error } = await supabase.from('hechizos').select('*');

  if (error) {
    console.error('Error al cargar hechizos:', error);
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-red-500">Error al cargar los hechizos</h1>
        <p className="text-gray-500">Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Hechizos Poderosos</h1>
      <Divider text="Descubre la magia" variant="magic" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hechizosData.map((hechizo) => (
          <Card
            key={hechizo.id}
            titulo={hechizo.nombre}
            subtitulo={hechizo.tipo}
            imagen={hechizo.imagen_url}
            variant="magic"
          >
            <p>{hechizo.descripcion}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}