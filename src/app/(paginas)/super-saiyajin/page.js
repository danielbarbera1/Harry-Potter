'use client'
import React, { useState } from 'react';
import { transformaciones } from '@/app/data/saiyans'; // Revisa esta ruta

export default function SuperSaiyajinPage() {
    const [faseActual, setFaseActual] = useState(transformaciones[0]);
    const [isTransforming, setIsTransforming] = useState(false);
    
    const handleTransform = () => {
        setIsTransforming(true);
        setTimeout(() => {
            setIsTransforming(false);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-black text-white p-10 font-mono italic">
            
            {/* FLASH DE TRANSFORMACIÓN */}
            {isTransforming && (
                <div className="fixed inset-0 z-[500] bg-white animate-pulse" />
            )}

            <div className="max-w-6xl mx-auto pt-10">
                <h1 className="text-6xl font-black mb-10 uppercase" style={{ color: faseActual.color }}>
                    Fase: {faseActual.name}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    
                    {/* BOTONES */}
                    <div className="space-y-4">
                        {transformaciones.map((fase) => (
                            <button
                                key={fase.id}
                                onClick={() => {
                                    setFaseActual(fase);
                                    handleTransform();
                                }} 
                                className={`w-full p-6 border-4 text-left transition-all font-black text-2xl
                                    ${faseActual.id === fase.id ? 'bg-white text-black' : 'border-zinc-800 text-zinc-500'}`}
                            >
                                {fase.name}
                            </button>
                        ))}
                    </div>

                    {/* VISUALIZACIÓN */}
                    <div className="relative">
                        {/* IMAGEN: Si no carga, revisa que faseActual.image tenga una URL válida */}
                        <div className={`flex justify-center transition-all duration-500 
                            ${isTransforming ? 'scale-150 blur-sm' : 'scale-100 blur-0'}
                            ${faseActual.id === 'ssj3' || isTransforming ? 'animate-shake' : ''} 
                        `}>
                            <img 
                                src={faseActual.image} 
                                alt={faseActual.name}
                                className="h-96 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                onError={(e) => console.log("Error cargando imagen de:", faseActual.name)}
                            />
                        </div>

                        {/* CARD DE DATOS CON TEMBLOR SI ESTÁ TRANSFORMANDO */}
                        <div className={`mt-10 p-8 border-8 border-black bg-zinc-900 transition-all ${faseActual.classAura} ${isTransforming ? 'animate-shake' : ''}`}>
                            <p className="text-sm mb-4">{faseActual.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-4xl font-black" style={{ color: faseActual.color }}>
                                    {faseActual.multiplier}
                                </span>
                                <button 
                                    onClick={handleTransform}
                                    className="px-6 py-2 font-black uppercase"
                                    style={{ backgroundColor: faseActual.color, color: 'black' }}
                                >
                                    ¡KAI-O-KEN!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}