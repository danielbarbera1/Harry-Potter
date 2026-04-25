"use client";
import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Modal from '../../../components/ui/Modal';
import Divider from '../../../components/ui/Divider';

export default function LibrosGrid({ libros, peliculas, hechizos, personajes }) {
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (libro) => {
    setSelectedLibro(libro);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLibro(null);
  };

  // Filtrar datos relacionados al libro seleccionado
  const getRelaciones = (libro) => {
    if (!libro) return { pelicula: null, hechizosLibro: [], personajesLibro: [] };

    // 1. Película (por UUID)
    const pelicula = peliculas.find(p => p.libros === libro.id);

    // 2. Hechizos (por nombre de libro - quitando espacios y saltos de línea)
    const nombreLimpio = libro.libro.trim().toLowerCase();
    const hechizosLibro = hechizos.filter(h => 
      h.libro?.trim().toLowerCase().includes(nombreLimpio) || 
      nombreLimpio.includes(h.libro?.trim().toLowerCase())
    );

    // 3. Personajes (detectados en 'uso_famoso' de los hechizos del libro)
    const nombresMencionados = new Set();
    hechizosLibro.forEach(h => {
      if (h.uso_famoso) {
        // Buscamos nombres de personajes en el texto de uso famoso
        personajes.forEach(p => {
          const primerNombre = p.nombre.split(' ')[0];
          if (h.uso_famoso.includes(primerNombre)) {
            nombresMencionados.add(p.id);
          }
        });
      }
    });

    const personajesLibro = personajes.filter(p => nombresMencionados.has(p.id));

    return { pelicula, hechizosLibro, personajesLibro };
  };

  const { pelicula, hechizosLibro, personajesLibro } = getRelaciones(selectedLibro);

  return (
    <>
      {/* Grid de Libros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
        {libros?.map((libro) => (
          <div key={libro.id} className="text-black flex justify-center">
            <Card
              titulo={libro.libro}
              subtitulo="Escrito por J.K. Rowling"
              imagen={libro.imagen_url}
              variant="default"
              onClick={() => handleOpenModal(libro)}
              onActionClick={() => handleOpenModal(libro)}
              actionText="Explorar Libro"
              actionIcon="📖"
            >
              <div className="mt-4">
                <p className="text-sm text-black opacity-80 line-clamp-3 italic">
                  {libro.mini_descripcion || "Un libro mágico lleno de aventuras y secretos..."}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal de Detalles */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedLibro?.libro}
        variant="magic"
        size="full"
      >
        <div className="space-y-8 text-black">
          {/* Trama y Película */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/30 p-6 rounded-xl border-2 border-purple-200">
            <div className="md:col-span-1">
              <h3 className="font-harry text-2xl text-purple-800 mb-4 flex items-center gap-2">
                🎬 La Película
              </h3>
              {pelicula ? (
                <div className="space-y-3">
                  <img 
                    src={pelicula.poster} 
                    alt={pelicula.titulo} 
                    className="w-full rounded-lg shadow-lg border-2 border-purple-300"
                  />
                  <div className="text-sm space-y-1">
                    <p><strong>Título:</strong> {pelicula.titulo}</p>
                    <p><strong>Director:</strong> {pelicula.director}</p>
                    <p><strong>Año:</strong> {pelicula['año-de-estreno']}</p>
                  </div>
                </div>
              ) : (
                <p className="italic text-gray-500">No se encontró información de la película.</p>
              )}
            </div>
            <div className="md:col-span-2">
              <h3 className="font-harry text-2xl text-purple-800 mb-4 flex items-center gap-2">
                📜 La Trama
              </h3>
              <p className="text-lg leading-relaxed first-letter:text-4xl first-letter:font-harry first-letter:mr-1">
                {pelicula?.sinopsis || selectedLibro?.mini_descripcion || "La historia de este libro es un misterio guardado en la Sección Prohibida..."}
              </p>
            </div>
          </div>

          {/* Personajes */}
          <section>
            <div className="mb-4">
              <h3 className="font-harry text-3xl text-purple-900 flex items-center gap-3">
                👥 Personajes Destacados
              </h3>
              <Divider variant="magic" />
            </div>
            {personajesLibro.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {personajesLibro.map(p => (
                  <div key={p.id} className="flex items-center gap-4 bg-white/40 p-3 rounded-lg border border-purple-100 hover:bg-white/60 transition-colors">
                    <img 
                      src={p.imagen_url} 
                      alt={p.nombre} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-400 shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-purple-900">{p.nombre}</h4>
                      <p className="text-xs font-bold uppercase text-purple-700">
                        {p.casas?.nombre || 'Hogwarts'} • {p.rol?.rol || 'Mago'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="italic text-gray-500 py-4">No hay personajes registrados para este libro en la base de datos.</p>
            )}
          </section>

          {/* Hechizos */}
          <section>
            <div className="mb-4">
              <h3 className="font-harry text-3xl text-purple-900 flex items-center gap-3">
                🪄 Hechizos Utilizados
              </h3>
              <Divider variant="magic" />
            </div>
            {hechizosLibro.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hechizosLibro.map(h => (
                  <div key={h.id} className="bg-purple-50/50 p-4 rounded-lg border-l-4 border-purple-500 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-purple-900 text-lg">{h.nombre}</h4>
                      <span className="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-bold uppercase">
                        {h.nivel}
                      </span>
                    </div>
                    <p className="text-sm italic text-gray-700 mb-2">"{h.efecto}"</p>
                    {h.uso_famoso && (
                      <div className="text-xs bg-white/60 p-2 rounded italic text-purple-800 border border-purple-100">
                        <strong>Uso famoso:</strong> {h.uso_famoso}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="italic text-gray-500 py-4">No hay hechizos registrados para este libro en la base de datos.</p>
            )}
          </section>
        </div>
      </Modal>
    </>
  );
}
