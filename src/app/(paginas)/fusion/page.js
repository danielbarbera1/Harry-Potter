'use client'
import React, { useState, useEffect } from 'react';
// Importación corregida según tu estructura de carpetas
import { fusionsData } from '@/app/data/fusions';

export default function FusionPage() {
  const [selectedFusion, setSelectedFusion] = useState(null);
  // Estado para las 3 imágenes (Guerrero 1, Guerrero 2 y Resultado)
  const [images, setImages] = useState({ w1: null, w2: null, result: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedFusion) {
      const fetchAllImages = async () => {
        setLoading(true);
        try {
          // Llamadas en paralelo a la API para mayor velocidad
          const [res1, res2, resRes] = await Promise.all([
            fetch(`https://dragonball-api.com/api/characters/${selectedFusion.warrior1Id}`),
            fetch(`https://dragonball-api.com/api/characters/${selectedFusion.warrior2Id}`),
            fetch(`https://dragonball-api.com/api/characters/${selectedFusion.resultId}`)
          ]);

          const [data1, data2, dataRes] = await Promise.all([
            res1.json(), res2.json(), resRes.json()
          ]);

          setImages({ 
            w1: data1.image, 
            w2: data2.image, 
            result: dataRes.image 
          });
        } catch (error) {
          console.error("Error cargando la fusión:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAllImages();
    }
  }, [selectedFusion]);

  return (
    <div className="min-h-screen bg-black text-white p-10 font-mono italic">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* PANEL IZQUIERDO: SELECCIÓN */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-black border-b-4 border-[#FCEE21] pb-2 mb-6 uppercase">Rituales</h3>
          {fusionsData.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFusion(f)}
              className={`w-full p-4 border-4 text-left transition-all font-black uppercase shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]
                ${selectedFusion?.id === f.id ? 'bg-[#FCEE21] text-black border-white translate-x-2' : 'border-zinc-800 hover:border-[#5088C5]'}`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* PANEL DERECHO: VISUALIZADOR MAESTRO */}
        <div className="lg:col-span-3 border-8 border-double border-zinc-700 p-10 bg-zinc-900/30 rounded-3xl relative overflow-hidden">
          {!selectedFusion ? (
            <div className="h-full flex items-center justify-center opacity-20">
              <p className="text-5xl font-black text-center">ESPERANDO<br/>INICIAR SECUENCIA</p>
            </div>
          ) : (
            <div className={`space-y-12 transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
              
              {/* FILA SUPERIOR: LOS GUERREROS ORIGINALES */}
              <div className="flex justify-between items-center max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-24 h-24 bg-zinc-800 rounded-full border-4 border-black overflow-hidden mb-2">
                    {images.w1 && <img src={images.w1} alt="W1" className="w-full h-full object-contain p-1" />}
                  </div>
                  <p className="text-[10px] font-black uppercase">Sujeto A</p>
                </div>

                <div className="text-5xl font-black text-[#FCEE21] animate-pulse">
                  {selectedFusion.method.includes("Potala") ? "CORE" : "STEP"}
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 bg-zinc-800 rounded-full border-4 border-black overflow-hidden mb-2">
                    {images.w2 && <img src={images.w2} alt="W2" className="w-full h-full object-contain p-1" />}
                  </div>
                  <p className="text-[10px] font-black uppercase">Sujeto B</p>
                </div>
              </div>

              {/* SECCIÓN CENTRAL: EL RESULTADO (FUSIÓN) */}
              <div className="relative flex justify-center py-10">
                {/* Aura de fondo */}
                <div className="absolute w-64 h-64 rounded-full blur-[100px] opacity-40 animate-pulse" 
                     style={{ backgroundColor: selectedFusion.color }}></div>
                
                <div className="relative z-10 transition-all duration-700 transform hover:scale-110">
                  {images.result ? (
                    <img 
                      src={images.result} 
                      alt="Resultado" 
                      className="h-80 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    />
                  ) : (
                    <div className="h-80 flex items-center">
                      <p className="animate-bounce font-black text-[#FCEE21]">CARGANDO PODER...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* INFO CARD */}
              <div className="bg-white text-black p-6 border-8 border-black shadow-[12px_12px_0px_0px_#000] relative">
                <div className="absolute -top-4 right-6 bg-[#E31F26] text-white px-4 py-1 font-black uppercase text-xs">
                  Resultado Exitoso
                </div>
                <h2 className="text-4xl font-black uppercase italic mb-2 tracking-tighter" style={{ color: selectedFusion.color }}>
                  {selectedFusion.name}
                </h2>
                <p className="text-sm font-bold leading-tight mb-4">{selectedFusion.description}</p>
                <div className="flex gap-4">
                  <div className="flex-1 bg-black text-white p-2 text-center text-xs font-black uppercase">
                    Método: {selectedFusion.method}
                  </div>
                  <div className="flex-1 bg-zinc-200 text-black p-2 text-center text-xs font-black uppercase border-2 border-black">
                    ID API: {selectedFusion.resultId}
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}