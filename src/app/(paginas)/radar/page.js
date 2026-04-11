'use client'
import React, { useState, useEffect } from 'react';

export default function DragonRadar() {
  // En JS no usamos <{...}[]>, solo inicializamos con el array vacío []
  const [dots, setDots] = useState([]); 

  useEffect(() => {
    const dragonBalls = [
      { id: 1, top: '20%', left: '30%', opacity: 1 },
      { id: 2, top: '45%', left: '70%', opacity: 1 },
      { id: 3, top: '60%', left: '20%', opacity: 1 },
      { id: 4, top: '15%', left: '60%', opacity: 1 },
      { id: 5, top: '80%', left: '50%', opacity: 1 },
      { id: 6, top: '35%', left: '40%', opacity: 1 },
      { id: 7, top: '55%', left: '80%', opacity: 1 },
    ];
    setDots(dragonBalls);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 font-mono">
      
      {/* Título Estilo Capsule Corp */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-teal-400 tracking-tighter uppercase italic">
          Dragon <span className="text-white">Radar</span>
        </h1>
        <p className="text-teal-600 text-sm">CAPSULE CORP. - MODEL No. 872</p>
      </div>

      {/* Contenedor Externo del Radar (El cuerpo físico) */}
      <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] bg-gray-300 rounded-full border-[12px] border-gray-400 shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center">
        
        {/* Botón Superior */}
        <div className="absolute -top-10 w-12 h-10 bg-gray-400 rounded-t-lg border-x-4 border-t-4 border-gray-500 shadow-lg"></div>

        {/* Pantalla del Radar */}
        <div className="relative w-[90%] h-[90%] bg-green-900 rounded-full border-8 border-gray-500 overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
          
          {/* Rejilla (Grid) */}
          <div className="absolute inset-0 opacity-30" 
               style={{ 
                 backgroundImage: `linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)`,
                 backgroundSize: '40px 40px' 
               }}>
          </div>

          {/* Círculos Concéntricos */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full border border-green-500/20 rounded-full"></div>
            <div className="absolute w-[66%] h-[66%] border border-green-500/20 rounded-full"></div>
            <div className="absolute w-[33%] h-[33%] border border-green-500/20 rounded-full"></div>
          </div>

          {/* Ejes X e Y */}
          <div className="absolute top-1/2 w-full h-[2px] bg-green-500/40"></div>
          <div className="absolute left-1/2 h-full w-[2px] bg-green-500/40"></div>

          {/* Efecto de Barrido (Scanner) */}
          <div className="absolute top-1/2 left-1/2 w-[50%] h-[50%] bg-gradient-to-tr from-green-400/20 to-transparent origin-bottom-left animate-[spin_4s_linear_infinite] rounded-tr-full border-r-2 border-green-400/50"></div>

          {/* Esferas del Dragón (Puntos amarillos) */}
          {dots.map((dot) => (
            <div
              key={dot.id}
              className="absolute w-3 h-3 md:w-4 md:h-4 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15] animate-pulse"
              style={{ top: dot.top, left: dot.left }}
            >
              {/* Reflejo de la esfera */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-60"></div>
            </div>
          ))}

          {/* Punto Central (Usuario) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-sm rotate-45 shadow-[0_0_8px_#dc2626]"></div>
        </div>
      </div>

      {/* Panel de Información Inferior */}
      <div className="mt-10 grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="bg-black/50 border border-teal-900 p-3 rounded-lg">
          <p className="text-[10px] text-teal-500 uppercase">Detección</p>
          <p className="text-xl text-yellow-500 font-bold">7 OBJETOS</p>
        </div>
        <div className="bg-black/50 border border-teal-900 p-3 rounded-lg">
          <p className="text-[10px] text-teal-500 uppercase">Rango</p>
          <p className="text-xl text-green-500 font-bold">1500 KM</p>
        </div>
      </div>

      <button 
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-500 transition-colors shadow-lg active:scale-95"
      >
        PULSAR PARA ESCANEAR
      </button>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </div>
  );
}