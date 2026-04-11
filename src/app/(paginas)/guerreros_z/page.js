'use client'
import React, { useState, useEffect } from 'react';
import Card from '@/app/components/ui/Card';
import Modal from '@/app/components/ui/Modal';
import SearchBar from '@/app/components/ui/SearchBar';

export default function GuerrerosZPage() {
  const [personajes, setPersonajes] = useState([]);// Estado para almacenar los personajes recuperados de la API
  const [loading, setLoading] = useState(true);//
  
  // 1. Estado para el texto del buscador
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const openDetails = (id) => {
    setSelectedCharacterId(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetch('https://dragonball-api.com/api/characters?limit=50')
      .then(res => res.json())
      .then(data => {
        setPersonajes(data.items);
        setLoading(false);
      });
  }, []);

  // 2. Lógica de filtrado: filtramos los personajes por nombre
  const personajesFiltrados = personajes.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center p-10 font-black italic uppercase">Escaneando niveles de poder...</div>;

  return (
    <div className="min-h-screen bg-[#f1f1f1] p-10 font-mono">
      
      {/* 3. Sección del buscador */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <h1 className="text-3xl text-black font-black italic uppercase tracking-tighter">
          Z-FIGHTERS <span className="text-[#E31F26]">DATABASE</span>
        </h1>
        
        <div className="w-full md:w-1/2">
          <SearchBar 
            placeholder="BUSCAR GUERRERO..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 4. Grid usando los personajes filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {personajesFiltrados.length > 0 ? (
          personajesFiltrados.map((p) => (
            <Card
              key={p.id}
              nombre={p.name}
              raza={p.race}
              poder={p.ki}
              imagen={p.image}
              onDetailClick={() => openDetails(p.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-xl font-black text-gray-400 uppercase italic">No se detecta rastro de ese Ki...</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        characterId={selectedCharacterId}
      />
    </div>
  );
}