import Hero from '../components/ui/Hero';
import Carousel from '../components/ui/Carousel';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Divider from '../components/ui/Divider';
import { createClient } from '../utils/supabase/server';
import { cookies } from 'next/headers';

export default async function HomePage() {
  // 1. Configuración de Supabase (Asíncrono en las nuevas versiones de Next.js)
  const supabase = await createClient();

  try {
    // 2. Llamada paralela a las tablas
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

    // Depuración: Mostrar datos en consola
    console.log('Personajes:', personajesData);
    console.log('Hechizos:', hechizosData);
    console.log('Casas:', casasData);
    console.log('Libros:', librosData);

    // Verificar si hay errores en la respuesta de Supabase
    if (casasRes.error) {
      console.error('Error al obtener las casas:', casasRes.error);
    }

    // 3. Mapeo de datos a Componentes Card
    const personajesDestacados = personajesData.map((p) => (
      <Card
        key={p.id}
        titulo={p.nombre}
        subtitulo={`Casa: ${p.casa_nombre || 'Hogwarts'}`}
        imagen={p.imagen_url}
        variant={p.casa_nombre?.toLowerCase() || 'gryffindor'}
        badge={p.etiqueta}
      >
        <p className="text-black font-medium italic">{p.descripcion}</p>
      </Card>
    ));

    const hechizosDestacados = hechizosData.map((h) => (
      <Card
        key={h.id}
        titulo={h.nombre}
        subtitulo={h.tipo}
        imagen={h.imagen_url}
        variant="magic"
        badge={h.nivel}
      >
        <p className="text-black font-medium">{h.descripcion}</p>
      </Card>
    ));

    const casasDestacadas = casasData.map((casa) => (
      <Card
        key={casa.id}
        titulo={casa.nombre}
        subtitulo={casa.colores}
        imagen={casa.imagen_url}
        variant={casa.nombre.toLowerCase()}
        href={`/casas/${casa.nombre}`}
      >
        <div className="text-black font-medium space-y-1">
          <p><strong>Fundador:</strong> {casa.fundador}</p>
          <p><strong>Animal:</strong> {casa.animal}</p>
          <p><strong>Cualidades:</strong> {casa.cualidades}</p>
          <p><strong>Fantasma:</strong> {casa.fantasma}</p>
          <p><strong>Jefe de Casa:</strong> {casa.jefe_de_casa}</p>
          <p><strong>Elemento:</strong> {casa.elemento}</p>
          <p><strong>Características:</strong> {casa.caracteristicas}</p>
        </div>
      </Card>
    ));

    const librosDestacados = librosData.map((l) => (
      <Card
        key={l.id}
        titulo={l.nombre}
        subtitulo={l.tipo}
        imagen={l.imagen_url}
        variant="book"
        badge={l.nivel}
      >
        <p className="text-black font-medium italic">{l.descripcion}</p>
      </Card>
    ));

    return (
      <>
        <Hero
          title="Bienvenido a Hogwarts"
          subtitle="Escuela de Magia y Hechicería"
          description="Descubre la magia que hay dentro de ti. Explora personajes, hechizos y las casas del mundo mágico."
          buttonText="Comenzar aventura"
          buttonLink="/register"
          backgroundImage="https://yeyvudsevhdjsdsbfwyd.supabase.co/storage/v1/object/public/casas/Gemini_Generated_Image_5hiis05hiis05hii.png"
          variant="gryffindor"
        />

        {/* Sección de Libros */}
        <section className="py-16 bg-gradient-to-b from-hogwarts-stone">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-harry text-4xl text-gryffindor-secondary mb-2">Libros Mágicos</h2>
              <Divider text="Explora los secretos de la magia" variant="gryffindor" />
            </div>

            {librosDestacados.length > 0 ? (
              <Carousel items={librosDestacados} slidesToShow={3} autoPlay={true} variant="gryffindor" />
            ) : (
              <div className="text-center py-10 text-gray-400 italic">
                <p>No se encontraron libros en la biblioteca...</p>
              </div>
            )}

            <div className="text-center mt-8">
              <Button variant="gryffindor" href="/libros">Ver todos los libros</Button>
            </div>
          </div>
        </section>
        
        {/* Sección de Personajes */}
        <section className="py-16 bg-gradient-to-b from-hogwarts-stone to-hogwarts-wood">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-harry text-4xl text-gryffindor-secondary mb-2">Personajes Mágicos</h2>
              <Divider text="Conoce a los héroes y villanos" variant="gryffindor" />
            </div>

            {personajesDestacados.length > 0 ? (
              <Carousel items={personajesDestacados} slidesToShow={3} autoPlay={true} variant="gryffindor" />
            ) : (
              <div className="text-center py-10 text-black italic">
                <p>No se encontraron magos en el Gran Comedor...</p>
              </div>
            )}

            <div className="text-center mt-8">
              <Button href="/personajes">Ver todos los personajes</Button>
            </div>
          </div>
        </section>

        {/* Sección de Hechizos */}
        <section className="py-16 bg-gradient-to-b from-hogwarts-wood to-hogwarts-stone">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-harry text-4xl text-gryffindor-secondary mb-2">Hechizos Poderosos</h2>
              <Divider text="Domina la magia" variant="magic" />
            </div>

            <div className="w-full">
              {hechizosDestacados.length > 0 ? (
                <Carousel items={hechizosDestacados} slidesToShow={4} autoPlay={true} variant="magic" />
              ) : (
                <div className="text-center py-10 text-gray-400 italic">
                  <p>La sección prohibida está vacía por ahora...</p>
                </div>
              )}
            </div>

            <div className="text-center mt-8">
              <Button variant="magic" href="/hechizos">Ver todos los hechizos</Button>
            </div>
          </div>
        </section>

        {/* Sección de Casas */}
        <section className="py-16 bg-gradient-to-b from-hogwarts-stone to-hogwarts-wood">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-harry text-4xl text-gryffindor-secondary mb-2">Las Cuatro Casas</h2>
              <Divider text="Elige tu destino" variant="hufflepuff" />
            </div>
            <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {casasDestacadas}
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-red-500">Error al cargar los datos</h1>
        <p className="text-gray-500">Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }
}