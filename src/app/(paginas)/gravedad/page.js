'use client'
import React, { useState, useEffect } from 'react';

export default function GravedadPage() {
  const [gravedad, setGravedad] = useState(1);
  const [isWarning, setIsWarning] = useState(false);

  // Efecto para la alerta visual si la gravedad es muy alta
  useEffect(() => {
    if (gravedad > 300) {
      setIsWarning(true);
    } else {
      setIsWarning(false);
    }
  }, [gravedad]);

  const aumentarGravedad = (cantidad) => {
    setGravedad(prev => Math.min(prev + cantidad, 500)); // Límite de 500g
  };

  const resetear = () => setGravedad(1);

  return (
    <div className={`min-h-screen transition-all duration-300 p-8 font-mono italic
      ${isWarning ? 'bg-red-900' : 'bg-zinc-900'} text-white`}>
      
      <div className="max-w-4xl mx-auto pt-20">
        
        {/* PANEL DE CONTROL CENTRAL */}
        <div className={`border-8 border-black p-10 shadow-[15px_15px_0px_0px_#000] mb-10 transition-transform
          ${gravedad > 100 ? 'animate-bounce' : ''} 
          ${isWarning ? 'bg-red-600' : 'bg-zinc-800'}`}>
          
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-5xl font-black uppercase tracking-tighter italic leading-none">
                Gravity <br /> <span className="text-[#FCEE21]">Chamber</span>
              </h1>
              <p className="text-[10px] font-bold bg-black text-white inline-block px-2 py-1 mt-4">
                CAPSULE CORP - MODEL G-400
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold block opacity-70 uppercase">Status</span>
              <span className={`font-black uppercase ${isWarning ? 'text-black animate-pulse' : 'text-green-400'}`}>
                {isWarning ? '!! CRITICAL !!' : 'Stable'}
              </span>
            </div>
          </div>

          {/* DISPLAY DE GRAVEDAD */}
          <div className="bg-black border-4 border-zinc-700 p-8 text-center relative overflow-hidden">
            {/* Líneas de escaneo decorativas */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
            
            <span className="text-xs text-[#FCEE21] font-bold block mb-2 uppercase tracking-widest">Gravedad Actual</span>
            <div className="text-8xl md:text-9xl font-black italic tabular-nums">
              {gravedad}<span className="text-3xl ml-2 text-[#FCEE21]">G</span>
            </div>
          </div>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => aumentarGravedad(10)}
            className="bg-zinc-800 border-4 border-black p-4 font-black hover:bg-[#5088C5] hover:text-white transition-all shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none"
          >
            +10G
          </button>
          <button 
            onClick={() => aumentarGravedad(50)}
            className="bg-zinc-800 border-4 border-black p-4 font-black hover:bg-[#5088C5] hover:text-white transition-all shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none"
          >
            +50G
          </button>
          <button 
            onClick={() => aumentarGravedad(100)}
            className="bg-zinc-700 border-4 border-black p-4 font-black text-[#FCEE21] hover:bg-[#E31F26] hover:text-white transition-all shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none"
          >
            +100G
          </button>
          <button 
            onClick={resetear}
            className="bg-[#E31F26] border-4 border-black p-4 font-black text-white hover:bg-black transition-all shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none"
          >
            RESET
          </button>
        </div>

        {/* MENSAJES DE ADVERTENCIA */}
        {isWarning && (
          <div className="mt-8 bg-black border-l-8 border-red-600 p-4 animate-pulse">
            <p className="text-red-600 font-black uppercase text-sm">
              ADVERTENCIA: La integridad física del usuario está en riesgo. <br />
              Niveles de gravedad superiores a 300G detectados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}