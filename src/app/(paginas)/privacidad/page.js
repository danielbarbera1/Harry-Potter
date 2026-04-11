'use client'
import React from 'react';

export default function PrivacidadPage() {
  const secciones = [
    {
      titulo: "1. RECOPILACIÓN DE DATOS (SCROLL DE NIVEL DE KI)",
      contenido: "Nuestros scouters solo recopilan información básica para mejorar tu experiencia de entrenamiento. No almacenamos tu nivel de Ki máximo sin tu consentimiento expreso."
    },
    {
      titulo: "2. USO DE CÁPSULAS (COOKIES)",
      contenido: "Utilizamos tecnología de 'Cápsulas' (cookies) para recordar tus preferencias de entrenamiento y configuraciones de gravedad. Al navegar por este sitio, aceptas la descompresión de estas cápsulas en tu navegador."
    },
    {
      titulo: "3. SEGURIDAD DE TRANSMISIÓN",
      contenido: "Toda la comunicación entre tu terminal y nuestra base de datos está protegida por un cifrado de nivel galáctico, superior al del Imperio de Freezer. Tus datos están a salvo de espionaje externo."
    },
    {
      titulo: "4. DERECHOS DEL GUERRERO",
      contenido: "Tienes derecho a solicitar la eliminación completa de tus registros de combate de nuestros servidores. Solo envía un mensaje a través de nuestro radar y procederemos al borrado instantáneo."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-10 font-mono italic">
      <div className="max-w-4xl mx-auto pt-20">
        
        {/* ENCABEZADO DE DOCUMENTO OFICIAL */}
        <div className="border-8 border-black bg-white p-8 shadow-[15px_15px_0px_0px_#5088C5] mb-12 relative overflow-hidden">
          {/* Sello de agua decorativo */}
          <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
            <div className="w-64 h-64 border-[20px] border-[#5088C5] rounded-full flex items-center justify-center">
              <span className="text-4xl font-black">CAPSULE</span>
            </div>
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl text-black font-black uppercase tracking-tighter mb-2">
              POLÍTICA DE <span className="text-[#5088C5]">PRIVACIDAD</span>
            </h1>
            <p className="text-xs font-bold bg-black text-white inline-block px-3 py-1 uppercase">
              Protocolo de Seguridad v.7.2 - Confidencial
            </p>
          </div>
        </div>

        {/* CONTENIDO TÉCNICO */}
        <div className="space-y-8">
          {secciones.map((sec, index) => (
            <div key={index} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 transition-transform">
              <h2 className="text-xl text-black font-black uppercase mb-3 border-b-4 border-[#FCEE21] inline-block">
                {sec.titulo}
              </h2>
              <p className="text-sm font-bold text-black leading-relaxed">
                {sec.contenido}
              </p>
            </div>
          ))}
        </div>

        {/* PIE DE PÁGINA DEL DOCUMENTO */}
        <div className="mt-16 text-center border-t-4 border-dashed border-black pt-8">
          <p className="text-[10px]  text-black font-black uppercase  tracking-widest">
            Este documento ha sido generado automáticamente por el sistema de inteligencia artificial de la Corporación Cápsula. <br />
            © 2026 - West City - Earth Sector.
          </p>
        </div>

      </div>
    </div>
  );
}