// components/carousel/Carousel.jsx
"use client";
import { useState, useEffect } from 'react';

export default function Carousel({ 
    children,
    items = [],
    autoPlay = false,
    autoPlayInterval = 5000,
    showArrows = true,
    showDots = true,
    slidesToShow = 1,
    variant = "gryffindor",
    className = ""
}) {
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const totalItems = items.length || children?.length || 0;
    const totalSlides = Math.ceil(totalItems / slidesToShow);

    // Configuración de colores según variante
    const variants = {
        gryffindor: {
            button: "bg-gryffindor-primary hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-gryffindor-primary",
            dot: "bg-gryffindor-primary",
            dotActive: "bg-gryffindor-secondary",
            border: "border-gryffindor-secondary"
        },
        slytherin: {
            button: "bg-slytherin-primary hover:bg-slytherin-secondary text-slytherin-secondary hover:text-slytherin-primary",
            dot: "bg-slytherin-primary",
            dotActive: "bg-slytherin-secondary",
            border: "border-slytherin-secondary"
        },
        ravenclaw: {
            button: "bg-ravenclaw-primary hover:bg-ravenclaw-secondary text-ravenclaw-secondary hover:text-ravenclaw-primary",
            dot: "bg-ravenclaw-primary",
            dotActive: "bg-ravenclaw-secondary",
            border: "border-ravenclaw-secondary"
        },
        hufflepuff: {
            button: "bg-hufflepuff-primary hover:bg-hufflepuff-secondary text-hufflepuff-secondary hover:text-hufflepuff-primary",
            dot: "bg-hufflepuff-primary",
            dotActive: "bg-hufflepuff-secondary",
            border: "border-hufflepuff-secondary"
        },
        magic: {
            button: "bg-purple-700 hover:bg-purple-500 text-white",
            dot: "bg-purple-700",
            dotActive: "bg-purple-300",
            border: "border-purple-400"
        },
        default: {
            button: "bg-hogwarts-wood hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-hogwarts-wood",
            dot: "bg-hogwarts-wood",
            dotActive: "bg-gryffindor-secondary",
            border: "border-gryffindor-secondary"
        }
    };

    const config = variants[variant] || variants.default;

    // Auto-play
    useEffect(() => {
        if (!autoPlay || !isPlaying || totalSlides <= 1) return;
        
        const interval = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);
        
        return () => clearInterval(interval);
    }, [currentIndex, autoPlay, isPlaying, totalSlides]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Si no hay contenido
    if (totalItems === 0) {
        return (
            <div className={`relative w-full h-64 bg-hogwarts-stone/20 rounded-2xl flex items-center justify-center border-4 ${config.border}/50 ${className}`}>
                <div className="text-center">
                    <span className="text-6xl animate-pulse">✨</span>
                    <p className="font-harry text-gryffindor-secondary mt-4">Sin contenido para mostrar</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            
            {/* Contenedor principal */}
            <div className="relative w-full overflow-hidden rounded-xl border-4 border-gryffindor-secondary/30 shadow-2xl">
                <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
                >
                    {items.length > 0 
                        ? items.map((item, index) => (
                            <div 
                                key={index} 
                                className="flex-shrink-0 p-2"
                                style={{ width: `${100 / slidesToShow}%` }}
                            >
                                {item}
                            </div>
                        ))
                        : children && React.Children.map(children, (child, index) => (
                            <div 
                                key={index} 
                                className="flex-shrink-0 p-2"
                                style={{ width: `${100 / slidesToShow}%` }}
                            >
                                {child}
                            </div>
                        ))
                    }
                </div>
                
                {/* Flechas de navegación */}
                {showArrows && totalSlides > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className={`
                                absolute left-4 top-1/2 -translate-y-1/2
                                w-10 h-10 rounded-full
                                ${config.button}
                                flex items-center justify-center
                                transition-all duration-300
                                hover:scale-110 active:scale-95
                                shadow-xl
                                z-10
                            `}
                        >
                            <span className="text-2xl">←</span>
                        </button>
                        
                        <button
                            onClick={nextSlide}
                            className={`
                                absolute right-4 top-1/2 -translate-y-1/2
                                w-10 h-10 rounded-full
                                ${config.button}
                                flex items-center justify-center
                                transition-all duration-300
                                hover:scale-110 active:scale-95
                                shadow-xl
                                z-10
                            `}
                        >
                            <span className="text-2xl">→</span>
                        </button>
                    </>
                )}
                
                {/* Indicadores (dots) */}
                {showDots && totalSlides > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {[...Array(totalSlides)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`
                                    w-2 h-2 rounded-full transition-all duration-300
                                    ${currentIndex === index 
                                        ? `${config.dotActive} w-6` 
                                        : `${config.dot} opacity-50 hover:opacity-100`
                                    }
                                `}
                            />
                        ))}
                    </div>
                )}
                
                {/* Control play/pause */}
                {autoPlay && totalSlides > 1 && (
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="absolute -bottom-8 right-0 w-8 h-8 rounded-full bg-hogwarts-parchment border-2 border-gryffindor-secondary flex items-center justify-center hover:scale-110 transition-transform text-sm"
                    >
                        {isPlaying ? '⏸' : '▶'}
                    </button>
                )}
            </div>
        </div>
    );
}