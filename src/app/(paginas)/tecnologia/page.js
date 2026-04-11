'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@/app/components/ui/Card'; // Ajusta la ruta si es necesario
import SearchBar from '@/app/components/ui/SearchBar'; // Ajusta la ruta si es necesario
import { tecnologiaSaiyan } from '@/app/data/tech';

export default function TecnologiaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Filtrado de productos por nombre
  const filteredTech = tecnologiaSaiyan.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6 md:p-12 font-mono italic">
      
      {/* HEADER ESTILO CAPSULE CORP */}
      <header className="max-w-7xl mx-auto mb-12">
        <div className="bg-white border-8 border-black p-8 shadow-[12px_12px_0px_0px_#5088C5] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none">
              CAPSULE <span className="text-[#5088C5]">CORP.</span>
            </h1>
            <p className="bg-black text-white inline-block px-3 py-1 text-sm font-bold mt-2 uppercase">
              Departamento de Ingeniería y Armamento
            </p>
          </div>
          
          <div className="w-full md:w-1/3">
            <SearchBar 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="RASTREAR MODELO..."
            />
          </div>
        </div>
      </header>

      {/* GRID DE PRODUCTOS */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredTech.length > 0 ? (
          filteredTech.map((item) => (
            <Card 
              key={item.id}
              nombre={item.name}
              raza={item.type} // Usamos 'type' donde normalmente va la raza
              poder={item.price} // Usamos 'price' donde va el poder
              imagen={item.image}
              onDetailClick={() => setSelectedItem(item)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 border-4 border-dashed border-gray-400">
            <p className="text-2xl font-black uppercase text-gray-400">Modelo no encontrado en la base de datos</p>
          </div>
        )}
      </main>

      {/* MODAL DE ESPECIFICACIONES (LOCAL) */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-white border-8 border-black w-full max-w-2xl shadow-[20px_20px_0px_0px_#5088C5] relative overflow-hidden">
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-[#E31F26] text-white border-4 border-black px-4 py-1 font-black z-10 hover:bg-black transition-colors"
            >
              X
            </button>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Imagen del Producto */}
                <div className="w-full md:w-1/2 bg-gray-100 border-4 border-black p-4 flex items-center justify-center">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name} 
                    className="max-h-60 object-contain drop-shadow-xl"
                  />
                </div>

                {/* Detalles */}
                <div className="w-full md:w-1/2 space-y-4">
                  <h2 className="text-3xl text-black font-black uppercase leading-tight border-b-4 border-black pb-2">
                    {selectedItem.name}
                  </h2>
                  <p className="text-sm font-bold text-black italic">
                    {selectedItem.description}
                  </p>
                  
                  <div className="bg-[#5088C5] p-4 border-4 border-black text-white shadow-[6px_6px_0px_0px_#000]">
                    <h4 className="text-xs uppercase font-black text-black mb-1">Ficha Técnica:</h4>
                    <p className="text-sm font-bold uppercase">{selectedItem.specs}</p>
                  </div>

                  <div className="text-2xl font-black text-[#E31F26] uppercase">
                    Precio: {selectedItem.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Decoración Inferior */}
            <div className="bg-black h-10 w-full flex items-center px-4 overflow-hidden">
              <div className="text-white text-[10px] font-bold uppercase tracking-widest whitespace-nowrap animate-pulse">
                SISTEMA OPERATIVO CAPSULE-OS v.4.0 // CARGANDO DATOS DE INGENIERÍA // SAIYAN TECH
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}