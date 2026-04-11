"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function MagicFooter() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const currentYear = new Date().getFullYear();

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            // Aquí iría la lógica de suscripción con Supabase
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 3000);
            setEmail('');
        }
    };

    // Datos de las casas de Hogwarts
    const houses = [
        { name: 'Gryffindor', icon: '🦁', color: 'gryffindor', href: '/casas/gryffindor', puntos: 452, bg: 'from-red-900 to-red-700' },
        { name: 'Slytherin', icon: '🐍', color: 'slytherin', href: '/casas/slytherin', puntos: 389, bg: 'from-green-900 to-green-700' },
        { name: 'Ravenclaw', icon: '🦅', color: 'ravenclaw', href: '/casas/ravenclaw', puntos: 412, bg: 'from-blue-900 to-blue-700' },
        { name: 'Hufflepuff', icon: '🦡', color: 'hufflepuff', href: '/casas/hufflepuff', puntos: 378, bg: 'from-yellow-800 to-yellow-600' },
    ];

    // Enlaces de exploración mágica
    const exploreLinks = [
        { name: 'Hogwarts Castle', icon: '🏰', href: '/hogwarts', desc: 'El castillo encantado' },
        { name: 'Callejón Diagon', icon: '🪄', href: '/callejon-diagon', desc: 'Comercio mágico' },
        { name: 'Bosque Prohibido', icon: '🌲', href: '/bosque-prohibido', desc: 'Criaturas mágicas' },
        { name: 'Ministerio de Magia', icon: '📜', href: '/ministerio', desc: 'Gobierno mágico' },
    ];

    // Enlaces de aprendizaje mágico
    const learnLinks = [
        { name: 'Hechizos y Encantamientos', icon: '⚡', href: '/hechizos' },
        { name: 'Pociones Mágicas', icon: '🧪', href: '/pociones' },
        { name: 'Historia de la Magia', icon: '📚', href: '/historia' },
        { name: 'Criaturas Fantásticas', icon: '🦄', href: '/criaturas' },
    ];

    return (
        <footer className="relative bg-gradient-to-b from-hogwarts-stone to-hogwarts-wood 
            text-hogwarts-parchment overflow-hidden mt-auto">

            {/* ============================================ */}
            {/* EFECTOS MÁGICOS DE FONDO */}
            {/* ============================================ */}

            {/* Barra superior estilo pergamino */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r 
                from-gryffindor-secondary via-slytherin-primary 
                via-ravenclaw-primary to-hufflepuff-primary">
            </div>

            {/* Patrón de estrellas animadas (como el techo del Gran Comedor) */}
            <div className="absolute inset-0 bg-stars opacity-20 pointer-events-none"></div>

            {/* Lechuzas volando (decoración animada) */}
            <div className="absolute top-10 left-10 animate-float opacity-70 pointer-events-none">
                <span className="text-4xl">🦉</span>
            </div>
            <div className="absolute top-20 right-20 animate-float opacity-70 pointer-events-none" style={{ animationDelay: '1s' }}>
                <span className="text-3xl">🦉</span>
            </div>
            <div className="absolute bottom-10 left-1/4 animate-float opacity-70 pointer-events-none" style={{ animationDelay: '2s' }}>
                <span className="text-2xl">🦉</span>
            </div>

            {/* Chispas mágicas flotantes (como polvo de hadas) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-sparkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: 0.3
                        }}
                    >
                        ✨
                    </div>
                ))}
            </div>

            {/* ============================================ */}
            {/* CONTENIDO PRINCIPAL */}
            {/* ============================================ */}
            <div className="relative z-10 container mx-auto px-4 pt-12 pb-6">

                {/* SECCIÓN 1: ENLACES TEMÁTICOS DE HOGWARTS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* COLUMNA 1: Exploración Mágica */}
                    <div className="text-center md:text-left group">
                        <h6 className="font-harry text-2xl mb-6 text-gryffindor-secondary 
                            flex items-center justify-center md:justify-start gap-2 
                            tracking-wider [text-shadow:2px_2px_0px_rgba(0,0,0,0.5)]">
                            <span className="bg-gryffindor-primary w-3 h-8 border-2 border-gryffindor-secondary -skew-x-12"></span>
                            Exploración
                        </h6>
                        <div className="space-y-3 text-hogwarts-parchment/80 flex flex-col items-center md:items-start">
                            {exploreLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="group/link hover:text-gryffindor-secondary transition-all 
                                        hover:translate-x-2 transform duration-300 flex items-center gap-2"
                                >
                                    <span className="text-xl group-hover/link:scale-110 transition-transform">
                                        {link.icon}
                                    </span>
                                    <span>{link.name}</span>
                                    <span className="text-xs opacity-0 group-hover/link:opacity-100 
                                        transition-all text-gryffindor-secondary">
                                        {link.desc}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA 2: Aprendizaje Mágico */}
                    <div className="text-center md:text-left">
                        <h6 className="font-harry text-2xl mb-6 text-ravenclaw-primary 
                            flex items-center justify-center md:justify-start gap-2 
                            tracking-wider [text-shadow:2px_2px_0px_rgba(0,0,0,0.5)]">
                            <span className="bg-slytherin-primary w-3 h-8 border-2 border-ravenclaw-primary -skew-x-12"></span>
                            Aprendizaje
                        </h6>
                        <div className="space-y-3 text-hogwarts-parchment/80 flex flex-col items-center md:items-start">
                            {learnLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="hover:text-ravenclaw-primary transition-all 
                                        hover:translate-x-2 transform duration-300 flex items-center gap-2"
                                >
                                    <span className="text-xl">{link.icon}</span>
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA 3: Las Cuatro Casas con puntuaciones */}
                    <div className="text-center md:text-left">
                        <h6 className="font-harry text-2xl mb-6 text-hufflepuff-primary 
                            flex items-center justify-center md:justify-start gap-2 
                            tracking-wider [text-shadow:2px_2px_0px_rgba(0,0,0,0.5)]">
                            <span className="bg-gryffindor-primary w-3 h-8 border-2 border-hufflepuff-primary -skew-x-12"></span>
                            Las Casas
                        </h6>
                        <div className="space-y-3 flex flex-col items-center md:items-start">
                            {houses.map((house) => (
                                <Link
                                    key={house.name}
                                    href={house.href}
                                    className="group/house transition-all hover:translate-x-2 transform duration-300 w-full"
                                >
                                    <div className="flex items-center justify-between gap-3 
                                        bg-hogwarts-parchment/10 rounded-lg p-2 
                                        hover:bg-hogwarts-parchment/20 transition-all">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl group-hover/house:scale-110 transition-transform">
                                                {house.icon}
                                            </span>
                                            <span className={`text-${house.color}-primary font-bold`}>
                                                {house.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-gryffindor-secondary">🏆</span>
                                            <span className="text-sm font-bold">{house.puntos}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA 4: Boletín de Lechuzas (Newsletter) */}
                    <div className="text-center md:text-left">
                        <h6 className="font-harry text-2xl mb-6 text-slytherin-primary 
                            flex items-center justify-center md:justify-start gap-2 
                            tracking-wider [text-shadow:2px_2px_0px_rgba(0,0,0,0.5)]">
                            <span className="bg-hufflepuff-primary w-3 h-8 border-2 border-slytherin-primary -skew-x-12"></span>
                            Boletín de Lechuzas
                        </h6>
                        <div className="bg-hogwarts-parchment/10 border-2 border-gryffindor-secondary/30 
                            rounded-xl p-4 shadow-lg backdrop-blur-sm">
                            <p className="text-sm text-hogwarts-parchment/90 mb-3">
                                📜 Recibe las últimas noticias del mundo mágico directamente por lechuza.
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="tu@correo.com"
                                        className="w-full px-4 py-2 pl-10 bg-hogwarts-parchment/20 
                                            border border-gryffindor-secondary/30 rounded-lg 
                                            text-hogwarts-parchment placeholder-hogwarts-parchment/50
                                            focus:outline-none focus:border-gryffindor-secondary 
                                            focus:bg-hogwarts-parchment/30 transition-all"
                                        required
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">
                                        🦉
                                    </span>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-gryffindor-primary text-gryffindor-secondary 
                                        font-harry rounded-lg hover:bg-gryffindor-secondary 
                                        hover:text-gryffindor-primary transition-all transform hover:scale-105"
                                >
                                    {subscribed ? '✓ ¡Enviado!' : 'Enviar Lechuza'}
                                </button>
                            </form>
                            {subscribed && (
                                <p className="text-xs text-gryffindor-secondary mt-2 text-center animate-pulse">
                                    ✨ ¡Suscrito con éxito! Revisa tu bandeja de entrada ✨
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ============================================ */}
                {/* SECCIÓN 2: SEPARADOR ESTILO PERGAMINO MÁGICO */}
                {/* ============================================ */}
                <div className="relative my-12">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-gryffindor-secondary/30"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="px-6 bg-hogwarts-stone border-2 border-gryffindor-secondary 
                            rounded-full shadow-lg backdrop-blur-sm">
                            <span className="text-gryffindor-secondary font-harry text-sm tracking-wider">
                                ✦ DRACO DORMIENS NUNQUAM TITILLANDUS ✦
                            </span>
                        </div>
                    </div>
                </div>

                {/* ============================================ */}
                {/* SECCIÓN 3: LOGO Y REDES SOCIALES */}
                {/* ============================================ */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Logo de Hogwarts */}
                    <div className="text-center md:text-left group">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <div className="relative">
                                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                                    🏰
                                </span>
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-gryffindor-secondary rounded-full animate-ping"></span>
                            </div>
                            <div>
                                <h2 className="font-harry text-3xl text-gryffindor-secondary 
                                    tracking-wider group-hover:tracking-widest transition-all">
                                    Hogwarts
                                </h2>
                                <p className="text-xs text-hogwarts-parchment/70 italic">
                                    Escuela de Magia y Hechicería
                                </p>
                            </div>
                        </div>
                        <p className="text-hogwarts-parchment/60 text-sm mt-3">
                            © {currentYear} - Fundada en el año 990 d.C.
                        </p>
                    </div>

                    {/* Redes sociales mágicas */}
                    <div className="flex gap-4">
                        {[
                            { name: '🐦', url: 'https://twitter.com/harrypotter', label: 'Twitter' },
                            { name: '📘', url: 'https://facebook.com/harrypotter', label: 'Facebook' },
                            { name: '📸', url: 'https://instagram.com/harrypotter', label: 'Instagram' },
                            { name: '🎬', url: 'https://youtube.com/harrypotter', label: 'YouTube' },
                            { name: '⚡', url: 'https://wizardingworld.com', label: 'Wizarding World' }
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/social relative w-12 h-12 bg-hogwarts-parchment/10 
                                    border-2 border-gryffindor-secondary/50 rounded-full 
                                    flex items-center justify-center text-2xl
                                    hover:bg-gryffindor-secondary hover:border-gryffindor-secondary
                                    hover:text-hogwarts-stone transition-all duration-300
                                    hover:scale-110 hover:rotate-6"
                                aria-label={social.label}
                            >
                                <span className="group-hover/social:scale-110 transition-transform">
                                    {social.name}
                                </span>
                                {/* Tooltip mágico */}
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2
                                    px-2 py-1 bg-hogwarts-wood text-hogwarts-parchment text-xs rounded
                                    opacity-0 group-hover/social:opacity-100 transition-all whitespace-nowrap
                                    pointer-events-none border border-gryffindor-secondary/30">
                                    {social.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* ============================================ */}
                {/* SECCIÓN 4: ENLACES LEGALES - REGLAS DE HOGWARTS */}
                {/* ============================================ */}
                <div className="mt-12 pt-6 border-t-2 border-gryffindor-secondary/30 
                    flex flex-wrap justify-center gap-6 text-hogwarts-parchment/60 text-sm">
                    <Link href="/privacidad" className="hover:text-gryffindor-secondary 
                        hover:underline decoration-2 decoration-gryffindor-secondary transition-all">
                        📜 Estatuto de Secreto
                    </Link>
                    <Link href="/terminos" className="hover:text-gryffindor-secondary 
                        hover:underline decoration-2 decoration-gryffindor-secondary transition-all">
                        🏰 Reglamento de Hogwarts
                    </Link>
                    <Link href="/cookies" className="hover:text-gryffindor-secondary 
                        hover:underline decoration-2 decoration-gryffindor-secondary transition-all">
                        🍪 Política de Galletas Mágicas
                    </Link>
                    <Link href="/contacto" className="hover:text-gryffindor-secondary 
                        hover:underline decoration-2 decoration-gryffindor-secondary transition-all">
                        🦉 Contacto por Lechuza
                    </Link>
                </div>

                {/* Créditos con magia */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-hogwarts-parchment/40">
                        ✦ Hecho con magia 🪄 por fans de Harry Potter ✦
                    </p>
                    <p className="text-xs text-hogwarts-parchment/30 mt-1">
                        "El poder está dentro de ti, siempre lo ha estado"
                    </p>
                </div>
            </div>
        </footer>
    );
}