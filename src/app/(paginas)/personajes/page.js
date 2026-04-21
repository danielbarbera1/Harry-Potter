import { createClient } from '../../../utils/supabase/server';
import ListaPersonajes from './ListaPersonajes';

export default async function PersonajesPage() {
  // Obtenemos el cliente de Supabase (Server Side)
  const supabase = await createClient();

  // Pedimos los datos incluyendo el nombre de la casa desde la tabla relacionada
  const { data: personajesData, error } = await supabase
    .from('personajes')
    .select('*, casas(nombre)');

  if (error) {
    console.error('Error al cargar personajes:', error);
    return (
      <div className="text-center py-20 bg-hogwarts-stone min-h-screen">
        <h1 className="text-4xl font-harry text-red-500 mb-4">¡Un error oscuro ha aparecido!</h1>
        <p className="text-hogwarts-parchment italic text-xl">Por favor, intenta nuevamente más tarde.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-8 px-6 py-2 bg-gryffindor-primary text-white rounded-lg"
        >
          Reintentar encantamiento
        </button>
      </div>
    );
  }

  // Si todo está bien, pasamos los datos al componente de cliente
  return (
    <main className="min-h-screen bg-hogwarts-stone">
      <ListaPersonajes personajesIniciales={personajesData || []} />
    </main>
  );
}