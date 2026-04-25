import { createClient } from '../../../utils/supabase/server';
import Divider from '../../../components/ui/Divider';
import Link from 'next/link';
import HechizosGrid from './HechizosGrid';

export default async function HechizosPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createClient();

  // ... (keeping existing logic)
  const itemsPerPage = 20; 
  const currentPage = parseInt(resolvedSearchParams?.page) || 1;
  const currentLevel = resolvedSearchParams?.level || 'Todos';

  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from('hechizos')
    .select('*', { count: 'exact' });

  if (currentLevel !== 'Todos') {
    query = query.eq('nivel', currentLevel);
  }

  const { data: hechizosData, error, count } = await query
    .order('nombre', { ascending: true })
    .range(from, to);

  if (error) {
    console.error('Error al cargar hechizos:', error);
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-red-500">Error al cargar los hechizos</h1>
        <p className="text-gray-500">Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }

  const totalItems = count || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const niveles = ['Todos', 'Principiante', 'Intermedio', 'Avanzado', 'Especial', 'Dudoso'];

  const levelColors = {
    'Principiante': 'bg-green-600 text-white',
    'Intermedio': 'bg-yellow-500 text-black',
    'Avanzado': 'bg-red-600 text-white',
    'Especial': 'bg-purple-600 text-white',
    'Dudoso': 'bg-gray-500 text-white',
    'default': 'bg-blue-600 text-white'
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Hechizos Poderosos</h1>
      <Divider text="Descubre la magia" variant="magic" />

      {/* Filtro de Niveles */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {niveles.map((nivel) => {
          const filterStyles = {
            'Todos': 'border-purple-400 text-purple-400 hover:bg-purple-400',
            'Principiante': 'border-green-500 text-green-500 hover:bg-green-500',
            'Intermedio': 'border-yellow-500 text-yellow-500 hover:bg-yellow-500',
            'Avanzado': 'border-red-500 text-red-500 hover:bg-red-500',
            'Especial': 'border-purple-600 text-purple-600 hover:bg-purple-600',
            'Dudoso': 'border-gray-500 text-gray-500 hover:bg-gray-500'
          };

          const isSelected = currentLevel === nivel;
          const baseStyle = filterStyles[nivel] || filterStyles['Todos'];

          return (
            <Link
              key={nivel}
              href={`?level=${nivel}&page=1`}
              className={`px-6 py-2 rounded-full font-bold border-2 transition-all transform hover:scale-110 hover:text-white shadow-[0_0_15px_rgba(0,0,0,0.2)] ${
                isSelected 
                ? baseStyle.replace('text-', 'bg-').replace('hover:bg-', 'border-') + ' text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                : baseStyle
              }`}
            >
              {nivel}
            </Link>
          );
        })}
      </div>

      <HechizosGrid hechizos={hechizosData} levelColors={levelColors} />

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
          {/* Botón Anterior */}
          {currentPage > 1 && (
            <Link
              href={`?level=${currentLevel}&page=${currentPage - 1}`}
              className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition-all shadow-lg hover:-translate-x-1"
            >
              ← Anterior
            </Link>
          )}

          {/* Números de página */}
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`dots-${index}`} className="px-3 py-2 text-purple-300 font-bold">
                  ...
                </span>
              );
            }
            return (
              <Link
                key={page}
                href={`?level=${currentLevel}&page=${page}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all shadow-md ${page === currentPage
                    ? 'bg-purple-700 text-white font-bold scale-110 ring-4 ring-purple-300'
                    : 'bg-hogwarts-parchment text-purple-700 hover:bg-purple-200 border-2 border-purple-700'
                  }`}
              >
                {page}
              </Link>
            );
          })}

          {/* Botón Siguiente */}
          {currentPage < totalPages && (
            <Link
              href={`?level=${currentLevel}&page=${currentPage + 1}`}
              className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition-all shadow-lg hover:translate-x-1"
            >
              Siguiente →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
