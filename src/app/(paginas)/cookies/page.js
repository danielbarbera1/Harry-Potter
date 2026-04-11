'use client'
import React from 'react';

export default function CookiesPage() {
  const listaCookies = [
    { nombre: "KI_SESSION", tipo: "Esencial", funcion: "Mantiene tu sesión activa mientras entrenas." },
    { nombre: "GRAVITY_LVL", tipo: "Preferencia", funcion: "Recuerda el último nivel de gravedad usado." },
    { nombre: "SCOUTER_ANALYTICS", tipo: "Estadística", funcion: "Mide qué secciones de la web visitas más." },
    { nombre: "FUSION_DANCE_SYNC", tipo: "Marketing", funcion: "Sincroniza anuncios de equipamiento de combate." }
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6 md:p-12 font-mono italic">
      <div className="max-w-5xl mx-auto pt-20">
        
        {/* CABECERA TÉCNICA */}
        <div className="bg-white border-8 border-black p-8 shadow-[12px_12px_0px_0px_#5088C5] mb-12">
          <h1 className="text-5xl text-black font-black uppercase tracking-tighter mb-4">
            POLÍTICA DE <span className="text-[#5088C5]">COOKIES</span>
          </h1>
          <p className="bg-black text-white inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest">
            Uso de Micro-Cápsulas de Datos // Capsule Corp OS
          </p>
        </div>

        {/* EXPLICACIÓN INICIAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
            <h3 className="text-xl text-black font-black uppercase mb-4">¿Qué son estas "Cápsulas"?</h3>
            <p className="text-sm text-black font-bold leading-relaxed">
              Las cookies son pequeñas unidades de almacenamiento que nuestro servidor envía a tu terminal. 
              Al igual que las cápsulas de Hoi-Poi, guardan información importante en un espacio reducido 
              para que tu navegación sea más rápida y eficiente.
            </p>
          </div>
          <div className="bg-[#5088C5] text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
            <h3 className="text-xl font-black uppercase mb-4 text-black">Control Total</h3>
            <p className="text-sm font-bold leading-relaxed">
              Puedes configurar tu scouter (navegador) para rechazar todas las cápsulas. 
              Sin embargo, ten en cuenta que algunas funciones de la cámara de gravedad 
              podrían no funcionar correctamente sin ellas.
            </p>
          </div>
        </div>

        {/* TABLA DE COOKIES */}
        <div className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_#000] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-4 uppercase font-black italic border-r border-zinc-700">Cápsula</th>
                <th className="p-4 uppercase font-black italic border-r border-zinc-700">Tipo</th>
                <th className="p-4 uppercase font-black italic">Función de Datos</th>
              </tr>
            </thead>
            <tbody>
              {listaCookies.map((cookie, index) => (
                <tr key={index} className="border-b-4 border-black hover:bg-[#FCEE21] transition-colors group">
                  <td className="p-4 font-black border-r-4 border-black group-hover:text-black uppercase text-sm">{cookie.nombre}</td>
                  <td className="p-4 font-bold border-r-4 border-black ">
                    <span className="bg-zinc-200 px-2 py-1 text-[10px]  group-hover:text-black transition-colors">
                      {cookie.tipo}
                    </span>
                  </td>
                  <td className="p-4 text-xs font-bold group-hover:text-black ">{cookie.function || cookie.funcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* NOTA DE CIERRE */}
        <div className="mt-12 text-center">
          <p className="text-xs font-black uppercase text-black">
            Última actualización de escaneo: Marzo 2026 // Sector Oeste
          </p>
        </div>

      </div>
    </div>
  );
}