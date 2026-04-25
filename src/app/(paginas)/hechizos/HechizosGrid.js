"use client";
import { useState } from 'react';
import Card from '../../../components/ui/Card';
import Modal from '../../../components/ui/Modal';
import Divider from '../../../components/ui/Divider';

export default function HechizosGrid({ hechizos, levelColors }) {
  const [selectedHechizo, setSelectedHechizo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (hechizo) => {
    setSelectedHechizo(hechizo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHechizo(null);
  };

  return (
    <>
      <div className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {hechizos && hechizos.length > 0 ? (
          hechizos.map((hechizo) => (
            <Card
              key={hechizo.id}
              titulo={
                <div className="flex flex-col items-start gap-1 py-1">
                  <span className="text-sm font-bold leading-tight line-clamp-2">
                    {hechizo.nombre}
                  </span>
                  {hechizo.nivel && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-sm border border-black/10 font-sans tracking-normal ${levelColors[hechizo.nivel] || levelColors.default}`}>
                      {hechizo.nivel}
                    </span>
                  )}
                </div>
              }
              subtitulo={hechizo.tipo}
              imagen={hechizo.imagen_url}
              variant="magic"
              onClick={() => handleOpenModal(hechizo)}
            >
              <div className="text-sm line-clamp-3">
                <p>{hechizo.descripcion || hechizo.efecto}</p>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-hogwarts-parchment rounded-xl border-2 border-dashed border-purple-300">
            <p className="text-2xl text-purple-700 font-bold mb-2">✨ No se encontraron hechizos ✨</p>
            <p className="text-gray-500 text-lg">Intenta con otro nivel de magia.</p>
          </div>
        )}
      </div>

      {/* Modal de Detalles del Hechizo */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedHechizo?.nombre}
        variant="magic"
        size="lg"
      >
        <div className="flex flex-col md:flex-row gap-6 text-black">
          <div className="md:w-1/3">
            <img 
              src={selectedHechizo?.imagen_url} 
              alt={selectedHechizo?.nombre} 
              className="w-full rounded-lg shadow-xl border-4 border-purple-400 object-cover aspect-square"
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <div>
              <h3 className="text-2xl font-harry text-purple-800">Detalles del Encantamiento</h3>
              <Divider variant="magic" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <p><strong>Tipo:</strong> {selectedHechizo?.tipo || 'Hechizo'}</p>
              <p><strong>Nivel:</strong> {selectedHechizo?.nivel || 'Desconocido'}</p>
              <p><strong>Visto por primera vez:</strong> {selectedHechizo?.libro || 'Sección Prohibida'}</p>
            </div>
            <div className="pt-4">
              <h3 className="text-xl font-harry text-purple-800">Efecto Mágico</h3>
              <p className="mt-2 text-lg italic leading-relaxed">
                "{selectedHechizo?.efecto || selectedHechizo?.descripcion}"
              </p>
            </div>
            {selectedHechizo?.uso_famoso && (
              <div className="pt-4 bg-purple-50 p-4 rounded-lg border-2 border-purple-200 italic">
                <p><strong>Uso famoso:</strong> {selectedHechizo.uso_famoso}</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
