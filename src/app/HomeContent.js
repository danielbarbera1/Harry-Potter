"use client";
import { useState } from 'react';
import Hero from '../components/ui/Hero';
import Carousel from '../components/ui/Carousel';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Divider from '../components/ui/Divider';
import Modal from '../components/ui/Modal';
import Link from 'next/link';

export default function HomeContent({ 
  personajesData, 
  hechizosData, 
  casasData, 
  librosData 
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null); // 'personaje', 'hechizo', 'libro', 'casa'
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setModalType(null);
  };

  const levelColors = {
    'Principiante': 'bg-green-600 text-white',
    'Intermedio': 'bg-yellow-500 text-black',
    'Avanzado': 'bg-red-600 text-white',
    'Especial': 'bg-purple-600 text-white',
    'Dudoso': 'bg-gray-500 text-white',
    'default': 'bg-blue-600 text-white'
  };

  const personajesDestacados = personajesData.map((p) => (
    <Card
      key={p.id}
      titulo={p.nombre}
      subtitulo={`Casa: ${p.casa_nombre || 'Hogwarts'}`}
      imagen={p.imagen_url}
      variant={p.casa_nombre?.toLowerCase() || 'gryffindor'}
      badge={p.etiqueta}
      onClick={() => handleOpenModal(p, 'personaje')}
    >
      <p className="text-black font-medium italic">{p.descripcion}</p>
    </Card>
  ));

  const hechizosDestacados = hechizosData.map((h) => (
    <Card
      key={h.id}
      titulo={
        <div className="flex flex-col items-start gap-1 py-1">
          <span className="text-sm font-bold leading-tight line-clamp-2">
            {h.nombre}
          </span>
          {h.nivel && (
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-sm border border-black/10 font-sans tracking-normal ${levelColors[h.nivel] || levelColors.default}`}>
              {h.nivel}
            </span>
          )}
        </div>
      }
      imagen={h.imagen_url}
      variant="magic"
      className="[&_.flex-grow]:hidden"
      onClick={() => handleOpenModal(h, 'hechizo')}
    >
      <p className="text-black font-medium">{h.descripcion || h.efecto}</p>
    </Card>
  ));

  const casasDestacadas = casasData.map((casa) => (
    <Card
      key={casa.id}
      titulo={casa.nombre}
      subtitulo={casa.colores}
      imagen={casa.imagen_url}
      variant={casa.nombre.toLowerCase()}
      onClick={() => handleOpenModal(casa, 'casa')}
    >
      <div className="text-black font-medium space-y-1">
        <p><strong>Fundador:</strong> {casa.fundador}</p>
        <p><strong>Animal:</strong> {casa.animal}</p>
      </div>
    </Card>
  ));

  const librosDestacados = librosData.map((l) => (
    <div 
      key={l.id} 
      className="w-full h-full flex items-center justify-center cursor-pointer"
      onClick={() => handleOpenModal(l, 'libro')}
    >
      <img
        src={l.imagen_url}
        alt={l.nombre}
        className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
      />
    </div>
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
          <div className="text-center mb-8">
            <h2 className="font-harry text-4xl text-gryffindor-secondary mb-2">Hechizos Poderosos</h2>
            <Divider text="Domina la magia" variant="magic" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['Principiante', 'Intermedio', 'Avanzado', 'Especial'].map((nivel) => {
              const levelColorsFilter = {
                'Principiante': 'hover:bg-green-600 border-green-600 text-green-200',
                'Intermedio': 'hover:bg-yellow-500 border-yellow-500 text-yellow-200',
                'Avanzado': 'hover:bg-red-600 border-red-600 text-red-200',
                'Especial': 'hover:bg-purple-600 border-purple-600 text-purple-200'
              };
              return (
                <Link
                  key={nivel}
                  href={`/hechizos?level=${nivel}`}
                  className={`px-4 py-1.5 rounded-full border-2 font-bold transition-all hover:text-white ${levelColorsFilter[nivel] || 'border-purple-400 text-purple-300'}`}
                >
                  {nivel}
                </Link>
              );
            })}
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

          <div className="text-center mt-10">
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

      {/* MODAL MULTIPROPÓSITO */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedItem?.nombre || selectedItem?.libro || selectedItem?.titulo}
        variant={modalType === 'hechizo' ? 'magic' : (selectedItem?.casa_nombre?.toLowerCase() || selectedItem?.nombre?.toLowerCase() || 'default')}
        size="lg"
      >
        {modalType === 'personaje' && (
          <div className="flex flex-col md:flex-row gap-6 text-black">
            <div className="md:w-1/3">
              <img src={selectedItem.imagen_url} alt={selectedItem.nombre} className="w-full rounded-lg border-4 border-hogwarts-wood shadow-xl object-cover aspect-[3/4]" />
            </div>
            <div className="md:w-2/3 space-y-4">
              <div>
                <h3 className="text-2xl font-harry text-gryffindor-secondary">Información General</h3>
                <Divider variant={selectedItem?.casa_nombre?.toLowerCase() || 'gryffindor'} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <p><strong>Casa:</strong> {selectedItem.casa_nombre || 'Desconocida'}</p>
                <p><strong>Sangre:</strong> {selectedItem.sangre || 'N/A'}</p>
                <p><strong>Patronus:</strong> {selectedItem.patronus || 'Desconocido'}</p>
                <p><strong>Actor:</strong> {selectedItem.actor || 'N/A'}</p>
                <p><strong>Especie:</strong> {selectedItem.especie || 'Humano'}</p>
                <p><strong>Género:</strong> {selectedItem.genero || 'N/A'}</p>
              </div>
              <div className="pt-4 border-t border-hogwarts-wood/20">
                <h3 className="text-xl font-harry text-gryffindor-secondary">Descripción</h3>
                <p className="mt-2 text-lg italic leading-relaxed">
                  "{selectedItem.descripcion}"
                </p>
              </div>
            </div>
          </div>
        )}

        {modalType === 'hechizo' && (
          <div className="text-black space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-harry text-purple-800">Detalles del Encantamiento</h3>
                <Divider variant="magic" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <p><strong>Tipo:</strong> {selectedItem.tipo || 'Hechizo'}</p>
                <p><strong>Nivel:</strong> {selectedItem.nivel || 'Desconocido'}</p>
                <p><strong>Visto por primera vez:</strong> {selectedItem.libro || 'Sección Prohibida'}</p>
              </div>
              <div className="pt-4 border-t border-purple-200">
                <h3 className="text-xl font-harry text-purple-800">Efecto Mágico</h3>
                <p className="mt-2 text-lg italic leading-relaxed">
                  "{selectedItem.efecto || selectedItem.descripcion}"
                </p>
              </div>
              {selectedItem.uso_famoso && (
                <div className="mt-4 bg-purple-50 p-4 rounded-lg border-2 border-purple-200 italic">
                  <p><strong>Uso famoso:</strong> {selectedItem.uso_famoso}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {modalType === 'libro' && (
          <div className="flex flex-col md:flex-row gap-6 text-black">
            <div className="md:w-1/3">
              <img src={selectedItem.imagen_url} alt={selectedItem.libro} className="w-full rounded-lg border-4 border-hogwarts-wood shadow-xl" />
            </div>
            <div className="md:w-2/3 space-y-4">
              <h3 className="text-2xl font-harry text-gryffindor-secondary border-b-2 border-hogwarts-wood pb-2">Crónica de Magia</h3>
              <p><strong>Título:</strong> {selectedItem.libro}</p>
              <p className="text-lg italic leading-relaxed pt-2">"{selectedItem.mini_descripcion || 'Un relato épico del mundo mágico.'}"</p>
              <div className="pt-4">
                <Button href="/libros" variant="gryffindor" onClick={handleCloseModal}>Explorar Biblioteca</Button>
              </div>
            </div>
          </div>
        )}

        {modalType === 'casa' && (
          <div className="flex flex-col md:flex-row gap-6 text-black">
            <div className="md:w-1/3">
              <img src={selectedItem.imagen_url} alt={selectedItem.nombre} className="w-full rounded-lg border-4 border-hogwarts-wood shadow-xl" />
            </div>
            <div className="md:w-2/3 space-y-4">
              <h3 className="text-2xl font-harry text-gryffindor-secondary border-b-2 border-hogwarts-wood pb-2">Legado de {selectedItem.nombre}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <p><strong>Fundador:</strong> {selectedItem.fundador}</p>
                <p><strong>Animal:</strong> {selectedItem.animal}</p>
                <p><strong>Elemento:</strong> {selectedItem.elemento}</p>
                <p><strong>Fantasma:</strong> {selectedItem.fantasma}</p>
              </div>
              <p><strong>Cualidades:</strong> {selectedItem.cualidades}</p>
              <div className="pt-4">
                <Button href={`/casas/${selectedItem.nombre}`} onClick={handleCloseModal}>Ver Sala Común</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
