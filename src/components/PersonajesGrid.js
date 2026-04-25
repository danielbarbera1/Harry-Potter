"use client";
import { useState } from 'react';
import Card from './ui/Card';
import Modal from './ui/Modal';
import Divider from './ui/Divider';

export default function PersonajesGrid({ personajes, variant = 'gryffindor' }) {
  const [selectedPersonaje, setSelectedPersonaje] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (personaje) => {
    setSelectedPersonaje(personaje);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPersonaje(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {personajes?.map((p) => (
          <Card
            key={p.id}
            titulo={p.nombre}
            subtitulo={p.rol?.rol || (p.casas?.nombre ? `Miembro de ${p.casas.nombre}` : 'Mago')}
            imagen={p.imagen_url}
            variant={p.casas?.nombre?.toLowerCase() || variant}
            badge={p.sangre}
            onClick={() => handleOpenModal(p)}
          >
            <p className="text-sm font-medium text-black italic">
              {p.descripcion}
            </p>
          </Card>
        ))}
      </div>

      {/* Modal de Detalles del Personaje */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedPersonaje?.nombre}
        variant={selectedPersonaje?.casas?.nombre?.toLowerCase() || variant}
        size="lg"
      >
        <div className="flex flex-col md:flex-row gap-6 text-black">
          <div className="md:w-1/3">
            <img 
              src={selectedPersonaje?.imagen_url} 
              alt={selectedPersonaje?.nombre} 
              className="w-full rounded-lg shadow-xl border-4 border-hogwarts-wood object-cover aspect-[3/4]"
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <div>
              <h3 className="text-2xl font-harry text-gryffindor-secondary">Información General</h3>
              <Divider variant={selectedPersonaje?.casas?.nombre?.toLowerCase() || variant} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <p><strong>Casa:</strong> {selectedPersonaje?.casas?.nombre || 'N/A'}</p>
              <p><strong>Sangre:</strong> {selectedPersonaje?.sangre || 'N/A'}</p>
              <p><strong>Patronus:</strong> {selectedPersonaje?.patronus || 'Desconocido'}</p>
              <p><strong>Actor:</strong> {selectedPersonaje?.actor || 'N/A'}</p>
              <p><strong>Especie:</strong> {selectedPersonaje?.especie || 'Humano'}</p>
              <p><strong>Género:</strong> {selectedPersonaje?.genero || 'N/A'}</p>
            </div>
            <div className="pt-4">
              <h3 className="text-xl font-harry text-gryffindor-secondary">Descripción</h3>
              <p className="mt-2 text-lg italic leading-relaxed">
                "{selectedPersonaje?.descripcion}"
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
