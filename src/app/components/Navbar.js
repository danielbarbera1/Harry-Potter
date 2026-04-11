"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Datos de navegación con más detalles
    const navItems = [
        { name: 'Inicio', icon: '🏠', href: '/', description: 'Portal de Hogwarts' },
        { name: 'Personajes', icon: '🧙', href: '/personajes', description: 'Conoce a los magos' },
        { name: 'Hechizos', icon: '⚡', href: '/hechizos', description: 'Magia y encantamientos' },
        { name: 'Casas', icon: '🏆', href: '/casas', description: 'Las cuatro casas' },
        { name: 'Objetos', icon: '🔮', href: '/objetos', description: 'Artefactos mágicos' },
        { name: 'Galería', icon: '📸', href: '/galeria', description: 'Recuerdos mágicos' },
    ];

    // Estado del usuario (simulado, conectar con Supabase después)
    const [user] = useState({
        name: 'Harry Fan',
        avatar: '/img/avatar-placeholder.jpg',
        casa: 'Gryffindor',
        puntosCasa: 1250,
        notificaciones: 3
    });

    return (
        <nav className={`
            fixed top-0 left-0 right-0 z-50 transition-all duration-500
            ${scrolled
                ? 'bg-gradient-to-r from-hogwarts-stone/95 to-hogwarts-wood/95 backdrop-blur-md py-2 shadow-2xl'
                : 'bg-transparent py-4'
            }
        `}>
            {/* Barra superior mágica con más colores */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r 
                from-gryffindor-secondary via-slytherin-primary 
                via-ravenclaw-primary to-hufflepuff-primary animate-pulse">
            </div>

            {/* Efecto de niebla mágica */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gryffindor-secondary/5 to-transparent"></div>
                <div className="absolute -top-1/2 left-1/4 w-64 h-64 bg-gryffindor-secondary/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">

                    {/* Logo de Hogwarts - Mejorado con más detalles */}
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative">
                            <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">🏰</span>
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gryffindor-secondary rounded-full animate-ping"></span>
                            {/* Efecto de brillo */}
                            <div className="absolute inset-0 rounded-full bg-gryffindor-secondary/20 blur-md group-hover:bg-gryffindor-secondary/40 transition-all"></div>
                        </div>
                        <div>
                            <h1 className="font-harry text-2xl text-gryffindor-secondary leading-tight 
                                tracking-wider group-hover:tracking-widest transition-all">
                                Hogwarts
                            </h1>
                            <p className="text-xs text-hogwarts-parchment -mt-1 italic">
                                Draco Dormiens Nunquam Titillandus
                            </p>
                        </div>
                    </Link>

                    {/* Menú de navegación (Desktop) - Mejorado con indicador activo */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group relative px-3 py-2 font-body text-lg transition-colors"
                                >
                                    <span className={`flex items-center gap-2 ${isActive ? 'text-gryffindor-secondary' : 'text-hogwarts-parchment hover:text-gryffindor-secondary'}`}>
                                        <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                                        {item.name}
                                    </span>

                                    {/* Tooltip mágico */}
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                                        px-2 py-1 bg-hogwarts-wood text-hogwarts-parchment text-xs rounded
                                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                        transition-all duration-300 whitespace-nowrap pointer-events-none
                                        border border-gryffindor-secondary/30 shadow-lg">
                                        {item.description}
                                    </div>

                                    {/* Barra inferior activa */}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-gryffindor-secondary 
                                        transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}>
                                    </span>

                                    {/* Efecto de chispa al hover */}
                                    <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 
                                        w-1 h-1 bg-gryffindor-secondary rounded-full 
                                        opacity-0 group-hover:opacity-100 group-hover:animate-ping">
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Perfil y acciones - Mejorado con más interactividad */}
                    <div className="flex items-center gap-3 lg:gap-4">
                        {/* Buscador mágico - Expandible */}
                        <div className={`relative hidden lg:block transition-all duration-300 ${searchFocused ? 'w-80' : 'w-64'}`}>
                            <input
                                type="text"
                                placeholder="Buscar en Hogwarts..."
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className="w-full px-4 py-2 pl-10 
                                    bg-hogwarts-parchment/20 border border-gryffindor-secondary/30 
                                    rounded-full text-hogwarts-parchment placeholder-hogwarts-parchment/50
                                    focus:outline-none focus:border-gryffindor-secondary 
                                    focus:bg-hogwarts-parchment/30 focus:shadow-lg
                                    transition-all duration-300"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">🔍</span>

                            {/* Sugerencias de búsqueda (opcional) */}
                            {searchFocused && (
                                <div className="absolute top-full mt-2 w-full bg-hogwarts-parchment 
                                    rounded-lg shadow-2xl border border-gryffindor-secondary/30 overflow-hidden">
                                    <div className="p-2 space-y-1">
                                        <div className="px-3 py-2 hover:bg-gryffindor-secondary/10 rounded cursor-pointer text-hogwarts-wood text-sm">
                                            ✨ Harry Potter
                                        </div>
                                        <div className="px-3 py-2 hover:bg-gryffindor-secondary/10 rounded cursor-pointer text-hogwarts-wood text-sm">
                                            🪄 Expecto Patronum
                                        </div>
                                        <div className="px-3 py-2 hover:bg-gryffindor-secondary/10 rounded cursor-pointer text-hogwarts-wood text-sm">
                                            🏰 Hogwarts Castle
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Notificaciones (Lechuza mejorada) */}
                        <button className="relative p-2 hover:bg-hogwarts-parchment/10 rounded-full 
                            transition-all duration-300 group hover:scale-110">
                            <span className="text-2xl group-hover:animate-bounce">🦉</span>
                            {user.notificaciones > 0 && (
                                <>
                                    <span className="absolute -top-1 -right-1 w-5 h-5 
                                        bg-gryffindor-primary rounded-full text-xs 
                                        flex items-center justify-center text-white
                                        animate-pulse ring-2 ring-gryffindor-secondary/50">
                                        {user.notificaciones}
                                    </span>
                                    <span className="absolute inset-0 rounded-full bg-gryffindor-secondary/20 
                                        animate-ping opacity-0 group-hover:opacity-100"></span>
                                </>
                            )}
                            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                                w-1 h-1 bg-gryffindor-secondary rounded-full 
                                opacity-0 group-hover:opacity-100 transition-opacity">
                            </span>
                        </button>

                        {/* Perfil - Mejorado con información de casa */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 p-1.5 hover:bg-hogwarts-parchment/10 
                                rounded-xl transition-all duration-300 hover:scale-105">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full border-2 border-gryffindor-secondary 
                                        overflow-hidden shadow-lg">
                                        <img src={user.avatar} alt="Perfil" className="w-full h-full object-cover" />
                                    </div>
                                    {/* Indicador de casa */}
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full 
                                        bg-gryffindor-primary border border-gryffindor-secondary 
                                        flex items-center justify-center text-[8px]">
                                        🦁
                                    </div>
                                </div>
                                <div className="hidden lg:block text-left">
                                    <span className="block font-body text-hogwarts-parchment text-sm font-semibold">
                                        {user.name}
                                    </span>
                                    <span className="block text-xs text-gryffindor-secondary">
                                        {user.puntosCasa} pts
                                    </span>
                                </div>
                            </button>

                            {/* Dropdown mágico mejorado */}
                            <div className="absolute right-0 mt-2 w-56 bg-hogwarts-parchment 
                                rounded-xl shadow-2xl border-2 border-gryffindor-secondary 
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                transition-all duration-300 transform group-hover:translate-y-2
                                overflow-hidden">
                                {/* Cabecera con decoración */}
                                <div className="bg-gradient-to-r from-gryffindor-primary to-gryffindor-secondary/80 p-3">
                                    <p className="text-white text-sm font-harry text-center">
                                        🧙 {user.name}
                                    </p>
                                </div>

                                <div className="p-2">
                                    <Link href="/perfil" className="flex items-center gap-3 px-4 py-2 
                                        text-hogwarts-wood hover:bg-gryffindor-secondary/20 
                                        rounded-lg transition-all group/link">
                                        <span className="text-xl group-hover/link:scale-110 transition-transform">🧙</span>
                                        <span>Mi Perfil</span>
                                    </Link>
                                    <Link href="/favoritos" className="flex items-center gap-3 px-4 py-2 
                                        text-hogwarts-wood hover:bg-gryffindor-secondary/20 
                                        rounded-lg transition-all group/link">
                                        <span className="text-xl group-hover/link:scale-110 transition-transform">⭐</span>
                                        <span>Favoritos</span>
                                    </Link>
                                    <Link href="/logros" className="flex items-center gap-3 px-4 py-2 
                                        text-hogwarts-wood hover:bg-gryffindor-secondary/20 
                                        rounded-lg transition-all group/link">
                                        <span className="text-xl group-hover/link:scale-110 transition-transform">🏆</span>
                                        <span>Logros</span>
                                    </Link>
                                    <Link href="/mi-casa" className="flex items-center gap-3 px-4 py-2 
                                        text-hogwarts-wood hover:bg-gryffindor-secondary/20 
                                        rounded-lg transition-all group/link">
                                        <span className="text-xl group-hover/link:scale-110 transition-transform">🦁</span>
                                        <span>Mi Casa</span>
                                        <span className="ml-auto text-xs text-gryffindor-primary">+{user.puntosCasa}</span>
                                    </Link>
                                    <hr className="my-2 border-hogwarts-wood/30" />
                                    <button className="w-full flex items-center gap-3 px-4 py-2 
                                        text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                        <span className="text-xl">🚪</span>
                                        <span>Cerrar Sesión</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Botón menú móvil mejorado */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden relative p-2 hover:bg-hogwarts-parchment/10 
                                rounded-lg transition-all duration-300 hover:scale-110"
                        >
                            <span className={`text-2xl transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                                {isOpen ? '✕' : '☰'}
                            </span>
                            {!isOpen && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 
                                    bg-gryffindor-secondary rounded-full animate-pulse">
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú móvil desplegable mejorado */}
            <div className={`
                md:hidden absolute left-0 right-0 
                bg-gradient-to-b from-hogwarts-stone to-hogwarts-wood
                transition-all duration-500 overflow-hidden border-t-2 border-gryffindor-secondary
                shadow-2xl backdrop-blur-md
                ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <div className="container mx-auto px-4 py-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block px-4 py-3 rounded-lg transition-all duration-300
                                    ${isActive
                                        ? 'bg-gryffindor-secondary/20 text-gryffindor-secondary'
                                        : 'text-hogwarts-parchment hover:bg-gryffindor-secondary/20'
                                    }
                                    transform hover:translate-x-2`}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-2xl w-8">{item.icon}</span>
                                    <span className="font-body">{item.name}</span>
                                    {isActive && (
                                        <span className="ml-auto text-gryffindor-secondary animate-pulse">✨</span>
                                    )}
                                </span>
                            </Link>
                        );
                    })}

                    {/* Separador para el buscador en móvil */}
                    <div className="mt-4 pt-4 border-t border-gryffindor-secondary/30">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="w-full px-4 py-2 pl-10 
                                    bg-hogwarts-parchment/20 border border-gryffindor-secondary/30 
                                    rounded-full text-hogwarts-parchment placeholder-hogwarts-parchment/50
                                    focus:outline-none focus:border-gryffindor-secondary"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">🔍</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}