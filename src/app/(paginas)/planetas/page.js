'use client'
import React, { useState, useEffect } from 'react';
import Card from '@/app/components/ui/Card'; 
import Modal from '@/app/components/ui/Modal';
import SearchBar from '@/app/components/ui/SearchBar';

export default function PlanetasPage() {
  const [planetas, setPlanetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para el Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);

  useEffect(() => {
    // Llamada a la API de Planetas
    fetch('https://dragonball-api.com/api/planets?limit=20')
      .then(res => res.json())
      .then(data => {
        // La API de planetas devuelve directamente un array o data.items según versión
        setPlanetas(data.items || data); 
        setLoading(false);
      })
      .catch(err => console.error("Error en la navegación espacial:", err));
  }, []);

  const openPlanetDetails = (id) => {
    setSelectedPlanetId(id);
    setIsModalOpen(true);
  };

  // Filtrado por nombre de planeta
  const planetasFiltrados = planetas.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f1f1]">
      <div className="text-center font-black italic text-2xl animate-pulse uppercase">
        CALCULANDO RUTA ESPACIAL...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f1f1] p-10 font-mono">
      
      {/* HEADER ESTILO CAPSULE CORP */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <div>
          <h1 className="text-3xl  text-black font-black italic uppercase tracking-tighter">
            GALAXY <span className="text-[#5088C5]">EXPLORER</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase">Sistema de navegación de Capsule Corp.</p>
        </div>
        
        <div className="w-full md:w-1/2">
          <SearchBar 
            placeholder="RASTREAR PLANETA..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* GRID DE PLANETAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {planetasFiltrados.length > 0 ? (
          planetasFiltrados.map((p) => (
            <Card
              key={p.id}
              nombre={p.name}
              // Usamos 'raza' para mostrar si está destruido o no
              raza={p.isDestroyed ? "DESTRUIDO" : "HABITABLE"}
              poder={p.id} // Aquí podrías poner el ID o cualquier otro dato
              imagen={p.image}
              onDetailClick={() => openPlanetDetails(p.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white border-4 border-dashed border-black">
            <p className="text-xl font-black text-gray-400 uppercase italic">
              Planeta no encontrado en los mapas galácticos.
            </p>
          </div>
        )}
      </div>

      {/* MODAL DE DETALLES DEL PLANETA */}
      {/* Nota: Tu componente Modal debe estar preparado para recibir el ID 
          y hacer el fetch a /api/planets/${id} 
      */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        characterId={selectedPlanetId} // Reutilizamos la prop aunque el nombre diga 'character'
        type="planet" // Podrías pasarle una prop para diferenciar si es planeta o guerrero
      />
    </div>
  );
}