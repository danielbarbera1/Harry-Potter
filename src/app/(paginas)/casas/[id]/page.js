import { createClient } from '../../../../utils/supabase/server';
import Card from '../../../../components/ui/Card';
import Divider from '../../../../components/ui/Divider';
import PersonajesGrid from '../../../../components/PersonajesGrid';

export default async function CasaPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Obtener los datos de la casa específica
  const { data: casa, error: casaError } = await supabase
    .from('casas')
    .select('*')
    .ilike('nombre', id)
    .single();

  if (casaError || !casa) {
    return (
      <div className="min-h-screen bg-hogwarts-stone flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-harry text-red-600 mb-4">Casa no encontrada</h1>
          <p className="text-hogwarts-parchment italic">Parece que el Sombrero Seleccionador está confundido...</p>
        </div>
      </div>
    );
  }

  // 2. Obtener los personajes que pertenecen a esta casa
  const { data: personajes, error: personajesError } = await supabase
    .from('personajes')
    .select('*, casas(nombre)')
    .eq('casa', casa.id);

  return (
    <main className={`min-h-screen bg-hogwarts-stone py-16`}>
      <div className="container mx-auto px-4">
        {/* Cabecera de la Casa */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
             <img 
               src={casa.imagen_url} 
               alt={casa.nombre} 
               className="h-48 object-contain drop-shadow-2xl animate-fade-in"
             />
          </div>
          <h1 className={`text-6xl font-harry mb-2 text-${casa.nombre.toLowerCase()}-secondary`}>
            {casa.nombre}
          </h1>
          <Divider text={casa.animal} variant={casa.nombre.toLowerCase()} />
        </div>

        {/* Detalles de la Casa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-hogwarts-wood/10 p-8 rounded-2xl border-2 border-hogwarts-wood">
            <h2 className="font-harry text-3xl text-gryffindor-secondary mb-4">Información</h2>
            <div className="space-y-3 text-hogwarts-parchment">
              <p><strong>Fundador:</strong> {casa.fundador}</p>
              <p><strong>Colores:</strong> {casa.colores}</p>
              <p><strong>Elemento:</strong> {casa.elemento}</p>
              <p><strong>Fantasma:</strong> {casa.fantasma}</p>
              <p><strong>Jefe de Casa:</strong> {casa.jefe_de_casa}</p>
            </div>
          </div>
          <div className="bg-hogwarts-wood/10 p-8 rounded-2xl border-2 border-hogwarts-wood">
            <h2 className="font-harry text-3xl text-gryffindor-secondary mb-4">Características</h2>
            <p className="text-hogwarts-parchment italic leading-relaxed">
              {casa.caracteristicas}
            </p>
            <div className="mt-4">
               <span className="font-bold text-gryffindor-secondary">Cualidades:</span>
               <p className="text-hogwarts-parchment">{casa.cualidades}</p>
            </div>
          </div>
        </div>

        {/* Lista de Alumnos de esta Casa */}
        <div className="mt-20">
          <h2 className="font-harry text-4xl text-center text-gryffindor-secondary mb-10">
            Alumnos Destacados
          </h2>
          {personajesError ? (
            <p className="text-center text-hogwarts-parchment">Error al cargar los alumnos.</p>
          ) : (
            <PersonajesGrid 
              personajes={personajes} 
              variant={casa.nombre.toLowerCase()} 
            />
          )}
        </div>
      </div>
    </main>
  );
}
