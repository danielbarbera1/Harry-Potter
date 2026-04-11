import Hero from './components/ui/Hero';
import Carousel from './components/ui/Carousel';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import Divider from './components/ui/Divider';
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  )
}

export default function HomePage() {
  const personajesDestacados = [
    <Card key="harry" titulo="Harry Potter" subtitulo="Casa: Gryffindor" imagen="/img/harry.jpg" variant="gryffindor" badge="Protagonista">
      <p>El Niño que Vivió</p>
    </Card>,
    <Card key="hermione" titulo="Hermione Granger" subtitulo="Casa: Gryffindor" imagen="/img/hermione.jpg" variant="gryffindor" badge="Sabia">
      <p>La bruja más brillante</p>
    </Card>,
    <Card key="draco" titulo="Draco Malfoy" subtitulo="Casa: Slytherin" imagen="/img/draco.jpg" variant="slytherin" badge="Rival">
      <p>Rival de Harry</p>
    </Card>,
  ];

  const hechizosDestacados = [
    <Card key="expecto" titulo="Expecto Patronum" subtitulo="Hechizo Defensivo" imagen="/img/patronus.jpg" variant="magic" badge="Avanzado">
      <p>Crea un patronus contra dementores</p>
    </Card>,
    <Card key="expelliarmus" titulo="Expelliarmus" subtitulo="Hechizo Desarmador" imagen="/img/expelliarmus.jpg" variant="magic" badge="Intermedio">
      <p>Desarma al oponente</p>
    </Card>,
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Bienvenido a Hogwarts"
        subtitle="Escuela de Magia y Hechicería"
        description="Descubre la magia que hay dentro de ti. Explora personajes, hechizos, casas y todo el mundo mágico de Harry Potter."
        buttonText="Comenzar aventura"
        buttonLink="/registro"
        backgroundImage="/img/hogwarts-castle.jpg"
        variant="gryffindor"
      />

      {/* Sección de Personajes Destacados */}
      <section className="py-16 bg-gradient-to-b from-hogwarts-stone to-hogwarts-wood">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-harry text-4xl text-gryffindor-secondary mb-2">
              Personajes Mágicos
            </h2>
            <Divider text="Conoce a los héroes y villanos" variant="gryffindor" />
          </div>
          <Carousel
            items={personajesDestacados}
            slidesToShow={3}
            autoPlay={true}
            variant="gryffindor"
          />
          <div className="text-center mt-8">
            <Button variant="gryffindor" href="/personajes">
              Ver todos los personajes
            </Button>
          </div>
        </div>
      </section>

      {/* Sección de Hechizos Destacados */}
      <section className="py-16 bg-gradient-to-b from-hogwarts-wood to-hogwarts-stone">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-harry text-4xl text-gryffindor-secondary mb-2">
              Hechizos Poderosos
            </h2>
            <Divider text="Domina la magia" variant="magic" />
          </div>
          <Carousel
            items={hechizosDestacados}
            slidesToShow={2}
            autoPlay={true}
            variant="magic"
          />
          <div className="text-center mt-8">
            <Button variant="magic" href="/hechizos">
              Ver todos los hechizos
            </Button>
          </div>
        </div>
      </section>

      {/* Sección de Casas */}
      <section className="py-16 bg-gradient-to-b from-hogwarts-stone to-hogwarts-wood">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-harry text-4xl text-gryffindor-secondary mb-2">
              Las Cuatro Casas
            </h2>
            <Divider text="Elige tu destino" variant="hufflepuff" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card titulo="Gryffindor" subtitulo="Valentía y Coraje" imagen="/img/gryffindor-crest.png" variant="gryffindor">
              <p>Fundador: Godric Gryffindor</p>
              <p>Animal: León</p>
            </Card>
            <Card titulo="Slytherin" subtitulo="Astucia y Ambición" imagen="/img/slytherin-crest.png" variant="slytherin">
              <p>Fundador: Salazar Slytherin</p>
              <p>Animal: Serpiente</p>
            </Card>
            <Card titulo="Ravenclaw" subtitulo="Sabiduría y Creatividad" imagen="/img/ravenclaw-crest.png" variant="ravenclaw">
              <p>Fundador: Rowena Ravenclaw</p>
              <p>Animal: Águila</p>
            </Card>
            <Card titulo="Hufflepuff" subtitulo="Lealtad y Justicia" imagen="/img/hufflepuff-crest.png" variant="hufflepuff">
              <p>Fundador: Helga Hufflepuff</p>
              <p>Animal: Tejón</p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

