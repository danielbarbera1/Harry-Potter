// components/modal/Modal.jsx
"use client";
import React, { useEffect, useState } from 'react';

export default function Modal({ 
    isOpen, 
    onClose, 
    title = "Información Mágica",
    children,
    loading = false,
    size = "md", // sm, md, lg, xl, full
    variant = "gryffindor",
    showHeader = true,
    showFooter = true,
    footerContent = null,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    onConfirm,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    showConfirm = false,
    showCancel = false
}) {
    
    // Configuración de variantes
    const variants = {
        gryffindor: {
            border: "border-gryffindor-primary",
            accent: "bg-gryffindor-primary",
            button: "bg-gryffindor-primary hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-gryffindor-primary border-gryffindor-secondary",
            cancel: "bg-hogwarts-wood hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-hogwarts-wood border-gryffindor-secondary",
            headerBg: "bg-gryffindor-primary",
            headerText: "text-gryffindor-secondary",
            shadow: "shadow-[15px_15px_0px_0px_rgba(127,9,9,0.5)]",
            icon: "🦁"
        },
        slytherin: {
            border: "border-slytherin-primary",
            accent: "bg-slytherin-primary",
            button: "bg-slytherin-primary hover:bg-slytherin-secondary text-slytherin-secondary hover:text-slytherin-primary border-slytherin-secondary",
            cancel: "bg-hogwarts-wood hover:bg-slytherin-secondary text-slytherin-secondary hover:text-hogwarts-wood border-slytherin-secondary",
            headerBg: "bg-slytherin-primary",
            headerText: "text-slytherin-secondary",
            shadow: "shadow-[15px_15px_0px_0px_rgba(13,98,23,0.5)]",
            icon: "🐍"
        },
        ravenclaw: {
            border: "border-ravenclaw-primary",
            accent: "bg-ravenclaw-primary",
            button: "bg-ravenclaw-primary hover:bg-ravenclaw-secondary text-ravenclaw-secondary hover:text-ravenclaw-primary border-ravenclaw-secondary",
            cancel: "bg-hogwarts-wood hover:bg-ravenclaw-secondary text-ravenclaw-secondary hover:text-hogwarts-wood border-ravenclaw-secondary",
            headerBg: "bg-ravenclaw-primary",
            headerText: "text-ravenclaw-secondary",
            shadow: "shadow-[15px_15px_0px_0px_rgba(14,26,64,0.5)]",
            icon: "🦅"
        },
        hufflepuff: {
            border: "border-hufflepuff-primary",
            accent: "bg-hufflepuff-primary",
            button: "bg-hufflepuff-primary hover:bg-hufflepuff-secondary text-hufflepuff-secondary hover:text-hufflepuff-primary border-hufflepuff-secondary",
            cancel: "bg-hogwarts-wood hover:bg-hufflepuff-secondary text-hufflepuff-secondary hover:text-hogwarts-wood border-hufflepuff-secondary",
            headerBg: "bg-hufflepuff-primary",
            headerText: "text-hufflepuff-secondary",
            shadow: "shadow-[15px_15px_0px_0px_rgba(238,225,23,0.5)]",
            icon: "🦡"
        },
        magic: {
            border: "border-purple-600",
            accent: "bg-purple-700",
            button: "bg-purple-700 hover:bg-purple-500 text-white border-purple-300",
            cancel: "bg-hogwarts-wood hover:bg-purple-700 text-purple-200 hover:text-white border-purple-500",
            headerBg: "bg-purple-800",
            headerText: "text-purple-200",
            shadow: "shadow-[15px_15px_0px_0px_rgba(128,0,128,0.5)]",
            icon: "🪄"
        },
        dark: {
            border: "border-gryffindor-secondary",
            accent: "bg-hogwarts-wood",
            button: "bg-hogwarts-wood hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-hogwarts-wood border-gryffindor-secondary",
            cancel: "bg-gray-700 hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-gray-700 border-gryffindor-secondary",
            headerBg: "bg-hogwarts-wood",
            headerText: "text-gryffindor-secondary",
            shadow: "shadow-[15px_15px_0px_0px_rgba(139,69,19,0.5)]",
            icon: "🏰"
        },
        default: {
            border: "border-gryffindor-secondary",
            accent: "bg-gryffindor-primary",
            button: "bg-gryffindor-primary hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-gryffindor-primary border-gryffindor-secondary",
            cancel: "bg-hogwarts-wood hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-hogwarts-wood border-gryffindor-secondary",
            headerBg: "bg-gryffindor-primary",
            headerText: "text-gryffindor-secondary",
            shadow: "shadow-[15px_15px_0px_0px_rgba(255,197,0,0.3)]",
            icon: "✨"
        }
    };

    // Configuración de tamaños
    const sizes = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-2xl",
        full: "max-w-4xl"
    };

    const config = variants[variant] || variants.default;
    const sizeClass = sizes[size] || sizes.md;

    // Cerrar con ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (closeOnEsc && e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose, closeOnEsc]);

    // Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={handleOverlayClick}
        >
            <div className={`
                ${sizeClass} w-full max-h-[90vh] overflow-y-auto
                bg-hogwarts-parchment 
                border-8 ${config.border}
                ${config.shadow}
                rounded-xl
                animate-scaleIn
            `}>
                
                {/* Header */}
                {showHeader && (
                    <div className={`
                        sticky top-0 z-10
                        ${config.headerBg} 
                        p-4 flex justify-between items-center
                        border-b-4 ${config.border}
                    `}>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{config.icon}</span>
                            <h2 className={`
                                font-harry text-xl md:text-2xl 
                                uppercase tracking-wider
                                ${config.headerText}
                            `}>
                                {title}
                            </h2>
                        </div>
                        <button 
                            onClick={onClose}
                            className={`
                                w-8 h-8 rounded-full
                                ${config.button}
                                flex items-center justify-center
                                text-sm font-bold
                                transition-all duration-300
                                hover:scale-110
                            `}
                        >
                            ✕
                        </button>
                    </div>
                )}
                
                {/* Contenido */}
                <div className="p-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-gryffindor-secondary border-t-gryffindor-primary rounded-full animate-spin"></div>
                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                                    🪄
                                </span>
                            </div>
                            <p className="mt-4 font-harry text-gryffindor-secondary animate-pulse">
                                Cargando magia...
                            </p>
                        </div>
                    ) : (
                        children
                    )}
                </div>
                
                {/* Footer */}
                {showFooter && (showConfirm || showCancel || footerContent) && (
                    <div className={`
                        p-4 border-t-4 ${config.border}
                        bg-hogwarts-parchment/80
                        flex justify-end gap-3
                    `}>
                        {footerContent ? (
                            footerContent
                        ) : (
                            <>
                                {showCancel && (
                                    <button
                                        onClick={onClose}
                                        className={`
                                            px-6 py-2
                                            border-4 rounded-lg
                                            font-harry text-sm uppercase tracking-wider
                                            transition-all duration-300
                                            hover:scale-105
                                            ${config.cancel}
                                        `}
                                    >
                                        {cancelText}
                                    </button>
                                )}
                                {showConfirm && (
                                    <button
                                        onClick={onConfirm}
                                        className={`
                                            px-6 py-2
                                            border-4 rounded-lg
                                            font-harry text-sm uppercase tracking-wider
                                            transition-all duration-300
                                            hover:scale-105
                                            ${config.button}
                                        `}
                                    >
                                        {confirmText}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}