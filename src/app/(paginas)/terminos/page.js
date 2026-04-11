'use client'
import React from 'react';

export default function TerminosPage() {
  const reglas = [
    {
      id: "01",
      titulo: "ACEPTACIÓN DEL DESAFÍO",
      desc: "Al acceder a esta base de datos, el usuario acepta cumplir con las normas de conducta de la comunidad. Queda prohibido el uso de técnicas prohibidas o software malicioso que interfiera con el flujo de Ki del servidor."
    },
    {
      id: "02",
      titulo: "PROPIEDAD DE LAS CÁPSULAS",
      desc: "Todo el contenido, diseños y marcas registradas de Capsule Corp mostrados en este sitio son propiedad intelectual. No se permite la replicación de tecnología Saiyajin sin autorización previa del Dr. Brief."
    },
    {
      id: "03",
      titulo: "LÍMITE DE RESPONSABILIDAD",
      desc: "No nos hacemos responsables por daños físicos o materiales derivados de entrenamientos en la cámara de gravedad si el usuario supera sus límites naturales sin supervisión de un maestro."
    },
    {
      id: "04",
      titulo: "MODIFICACIONES DEL REGLAMENTO",
      desc: "Nos reservamos el derecho de invocar a Shenlong para cambiar estos términos en cualquier momento. Es responsabilidad del guerrero revisar este pergamino periódicamente."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-8 md:p-16 font-mono italic">
      <div className="max-w-5xl mx-auto pt-16">
        
        {/* CABECERA ESTILO PERGAMINO DIGITAL */}
        <div className="bg-black text-white p-10 border-b-[16px] border-[#E31F26] mb-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]">
          <h1 className="text-6xl font-black uppercase tracking-tighter italic mb-4">
            TÉRMINOS DE <span className="text-[#FCEE21]">SERVICIO</span>
          </h1>
          <p className="text-sm font-bold opacity-80 uppercase tracking-widest">
            Manual del Participante // Código de Honor Guerrero // Rev. 2026.03
          </p>
        </div>

        {/* LISTADO DE REGLAS */}
        <div className="grid grid-cols-1 gap-6">
          {reglas.map((regla) => (
            <div key={regla.id} className="group bg-white border-4 border-black p-8 flex flex-col md:flex-row gap-8 hover:bg-[#FCEE21] transition-all duration-300 shadow-[10px_10px_0px_0px_#000]">
              {/* NÚMERO DE REGLA */}
              <div className="text-7xl font-black text-zinc-200 group-hover:text-black transition-colors leading-none">
                {regla.id}
              </div>
              
              {/* CONTENIDO */}
              <div className="flex-1">
                <h2 className="text-2xl font-black uppercase mb-4 border-b-2 border-zinc-700 group-hover:text-black  pb-2 inline-block">
                  {regla.titulo}
                </h2>
                <p className="text-sm font-bold leading-relaxed text-zinc-700 group-hover:text-black">
                  {regla.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ADVERTENCIA FINAL */}
        <div className="mt-20 p-8 border-4 border-dashed border-red-600 bg-red-50 text-red-600">
          <p className="font-black uppercase text-center text-sm">
            EL INCUMPLIMIENTO DE ESTAS NORMAS RESULTARÁ EN LA DESCALIFICACIÓN INMEDIATA DEL TORNEO Y POSIBLE EXILIO AL REINO DE LOS DEMONIOS.
          </p>
        </div>

      </div>
    </div>
  );
}