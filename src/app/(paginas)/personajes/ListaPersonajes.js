"use client";
import { useState } from 'react';
import Card from '../../../components/ui/Card';
import Divider from '../../../components/ui/Divider';
import PersonajesGrid from '../../../components/PersonajesGrid';

export default function ListaPersonajes({ personajesIniciales }) {
  const [selectedCasa, setSelectedCasa] = useState('');
  
  const casas = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];

  const personajesFiltrados = personajesIniciales.filter((personaje) => {
    if (!selectedCasa) return true;
    
    // El nombre ahora viene de la relación 'casas'
    const nombreCasa = personaje.casas?.nombre || '';
    return nombreCasa.toLowerCase() === selectedCasa.toLowerCase();
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-harry text-center mb-8 text-gryffindor-secondary">
        Personajes Mágicos
      </h1>
      <Divider text="Filtra por casa" variant="gryffindor" />

      {/* Filtros de Casas */}
      <div className="flex flex-wrap justify-center gap-4 my-8">
        <button
          onClick={() => setSelectedCasa('')}
          className={`px-6 py-2 rounded-full font-bold transition-all ${
            selectedCasa === '' 
            ? 'bg-hogwarts-wood text-hogwarts-parchment border-2 border-gryffindor-secondary shadow-lg' 
            : 'bg-hogwarts-parchment/20 text-hogwarts-parchment hover:bg-hogwarts-parchment/40'
          }`}
        >
          ✨ Todos
        </button>
        {casas.map((casa) => (
          <button
            key={casa}
            onClick={() => setSelectedCasa(casa)}
            className={`px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 ${
              selectedCasa === casa 
              ? `bg-${casa.toLowerCase()}-primary text-white border-2 border-${casa.toLowerCase()}-secondary shadow-xl scale-110` 
              : 'bg-hogwarts-parchment/20 text-hogwarts-parchment hover:bg-hogwarts-parchment/40'
            }`}
          >
            {casa.toLowerCase() === 'gryffindor' && '🦁 '}
            {casa.toLowerCase() === 'slytherin' && '🐍 '}
            {casa.toLowerCase() === 'ravenclaw' && '🦅 '}
            {casa.toLowerCase() === 'hufflepuff' && '🦡 '}
            {casa}
          </button>
        ))}
      </div>

      {/* Grid de Personajes */}
      <PersonajesGrid personajes={personajesFiltrados} />
    </div>
  );
}
