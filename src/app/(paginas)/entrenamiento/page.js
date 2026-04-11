'use client'
import React, { useState, useEffect } from 'react';

export default function EntrenamientoPage() {
  const [ki, setKi] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [rank, setRank] = useState("Humano");

  // Lógica para aumentar el Ki mientras se presiona el botón
  useEffect(() => {
    let interval;
    if (isCharging) {
      interval = setInterval(() => {
        setKi(prev => prev + 150);
      }, 50);
    } else {
      // El Ki baja lentamente si no estás cargando
      interval = setInterval(() => {
        setKi(prev => (prev > 0 ? prev - 50 : 0));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isCharging]);

  // Actualizar el Rango según el Ki
  useEffect(() => {
    if (ki > 10000) setRank("Super Saiyajin");
    else if (ki > 5000) setRank("Guerrero de Élite");
    else if (ki > 1000) setRank("Guerrero Z");
    else setRank("Humano");
  }, [ki]);

  return (
    <div className={`min-h-screen transition-colors duration-500 p-10 font-mono italic
      ${ki > 10000 ? 'bg-yellow-100' : 'bg-[#f1f1f1]'}`}>
      
      <div className="max-w-4xl mx-auto">
        {/* PANTALLA DEL SCOUTER */}
        <div className={`border-8 border-black p-8 shadow-[12px_12px_0px_0px_#000] mb-10 transition-all
          ${ki > 5000 ? 'bg-red-500 text-white' : 'bg-white text-black'}`}>
          
          <h1 className="text-4xl font-black uppercase mb-4 tracking-tighter">
            Análisis de <span className={ki > 5000 ? 'text-white' : 'text-[#E31F26]'}>Poder</span>
          </h1>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <p className="text-xs font-bold uppercase opacity-70">Nivel de Ki Detectado:</p>
              <p className="text-7xl font-black tabular-nums">{ki.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase opacity-70">Clasificación:</p>
              <p className="text-3xl font-black uppercase tracking-widest bg-black text-white px-4 py-1">
                {rank}
              </p>
            </div>
          </div>

          {/* BARRA DE ENERGÍA */}
          <div className="w-full h-8 border-4 border-black mt-8 bg-gray-200 relative overflow-hidden">
            <div 
              className={`h-full transition-all duration-100 ${ki > 10000 ? 'bg-[#FCEE21]' : 'bg-[#5088C5]'}`}
              style={{ width: `${Math.min((ki / 15000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* CONTROLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
            <h3 className="text-xl text-black font-black mb-4 uppercase">Cámara de Gravedad</h3>
            <p className="text-sm text-black font-bold mb-6">Manten presionado el botón para elevar tu Ki. ¡Cuidado con sobrecargar el rastreador!</p>
            
            <button
              onMouseDown={() => setIsCharging(true)}
              onMouseUp={() => setIsCharging(false)}
              onMouseLeave={() => setIsCharging(false)}
              onTouchStart={() => setIsCharging(true)}
              onTouchEnd={() => setIsCharging(false)}
              className="w-full bg-[#E31F26] text-white py-6 border-4 border-black font-black text-2xl uppercase shadow-[6px_6px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all select-none"
            >
              ¡CARGAR KI!
            </button>
          </div>

          <div className="bg-black text-white p-6 border-4 border-[#5088C5] shadow-[8px_8px_0px_0px_#5088C5]">
            <h3 className="text-xl font-black mb-4 uppercase text-[#FCEE21]">Logs del Sistema</h3>
            <div className="space-y-2 text-[10px] font-bold uppercase opacity-80">
              <p>{ki > 0 ? "> Detectando fluctuación de energía..." : "> Sistema en espera."}</p>
              {ki > 5000 && <p className="text-red-400">!! ADVERTENCIA: NIVEL DE ÉLITE ALCANZADO !!</p>}
              {ki > 12000 && <p className="animate-pulse text-yellow-400">!! ERROR: EL SCOUTER SE VA A ROMPER !!</p>}
              <p> Coordenadas: Sector 403 - Tierra</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}