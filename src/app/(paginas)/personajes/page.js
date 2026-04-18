`use client`;
import { useState } from 'react';
import { createClient } from '../../../utils/supabase/server';
import Card from '../../../components/ui/Card';
import Divider from '../../../components/ui/Divider';

export default async function PersonajesPage() {
  const supabase = await createClient();

  const [selectedCasa, setSelectedCasa] = useState('');

  const { data: personajesData, error } = await supabase.from('personajes').select('*');

  if (error) {
    console.error('Error al cargar personajes:', error);
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-red-500">Error al cargar los personajes</h1>
        <p className="text-gray-500">Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }

  const casas = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];

  const personajesFiltrados = personajesData.filter((personaje) =>
    selectedCasa ? personaje.casa === selectedCasa : true
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Personajes Mágicos</h1>
      <Divider text="Filtra por casa" variant="gryffindor" />

      <div className="flex justify-center my-6">
        {casas.map((casa) => (
          <button
            key={casa}
            onClick={() => setSelectedCasa(casa)}
            className={`px-4 py-2 mx-2 rounded ${
              selectedCasa === casa ? 'bg-gryffindor-secondary text-white' : 'bg-gray-200'
            }`}
          >
            {casa}
          </button>
        ))}
        <button
          onClick={() => setSelectedCasa('')}
          className="px-4 py-2 mx-2 rounded bg-gray-200"
        >
          Todas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personajesFiltrados.map((personaje) => (
          <Card
            key={personaje.id}
            titulo={personaje.nombre}
            subtitulo={`Casa: ${personaje.casa}`}
            imagen={personaje.imagen_url}
            variant={personaje.casa.toLowerCase()}
          >
            <p>{personaje.descripcion}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}