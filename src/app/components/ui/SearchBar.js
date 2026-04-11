// components/search/SearchBar.jsx
"use client";
import { useState } from 'react';

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Buscar en Hogwarts...",
  variant = "gryffindor",
  size = "md",
  withButton = true,
  buttonIcon = "🔍",
  buttonText = "",
  autoFocus = false,
  debounce = 0,
  className = "",
  inputClassName = "",
  buttonClassName = ""
}) {

  const [localValue, setLocalValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);

  // Configuración de variantes
  const variants = {
    gryffindor: {
      input: "border-gryffindor-secondary focus:border-gryffindor-primary",
      button: "bg-gryffindor-primary hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-gryffindor-primary",
      icon: "text-gryffindor-secondary",
      shadow: "shadow-[6px_6px_0px_0px_rgba(127,9,9,0.3)]",
      placeholder: "text-gryffindor-primary/50"
    },
    slytherin: {
      input: "border-slytherin-secondary focus:border-slytherin-primary",
      button: "bg-slytherin-primary hover:bg-slytherin-secondary text-slytherin-secondary hover:text-slytherin-primary",
      icon: "text-slytherin-secondary",
      shadow: "shadow-[6px_6px_0px_0px_rgba(13,98,23,0.3)]",
      placeholder: "text-slytherin-primary/50"
    },
    ravenclaw: {
      input: "border-ravenclaw-secondary focus:border-ravenclaw-primary",
      button: "bg-ravenclaw-primary hover:bg-ravenclaw-secondary text-ravenclaw-secondary hover:text-ravenclaw-primary",
      icon: "text-ravenclaw-secondary",
      shadow: "shadow-[6px_6px_0px_0px_rgba(14,26,64,0.3)]",
      placeholder: "text-ravenclaw-primary/50"
    },
    hufflepuff: {
      input: "border-hufflepuff-secondary focus:border-hufflepuff-primary",
      button: "bg-hufflepuff-primary hover:bg-hufflepuff-secondary text-hufflepuff-secondary hover:text-hufflepuff-primary",
      icon: "text-hufflepuff-secondary",
      shadow: "shadow-[6px_6px_0px_0px_rgba(238,225,23,0.3)]",
      placeholder: "text-hufflepuff-primary/50"
    },
    magic: {
      input: "border-purple-400 focus:border-purple-600",
      button: "bg-purple-700 hover:bg-purple-500 text-white",
      icon: "text-white",
      shadow: "shadow-[6px_6px_0px_0px_rgba(128,0,128,0.3)]",
      placeholder: "text-purple-400/50"
    },
    dark: {
      input: "border-gryffindor-secondary focus:border-gryffindor-primary",
      button: "bg-hogwarts-wood hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-hogwarts-wood",
      icon: "text-gryffindor-secondary",
      shadow: "shadow-[6px_6px_0px_0px_rgba(139,69,19,0.3)]",
      placeholder: "text-gryffindor-secondary/50"
    },
    default: {
      input: "border-gryffindor-secondary focus:border-gryffindor-primary",
      button: "bg-gryffindor-primary hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-gryffindor-primary",
      icon: "text-gryffindor-secondary",
      shadow: "shadow-[6px_6px_0px_0px_rgba(255,197,0,0.3)]",
      placeholder: "text-gryffindor-primary/50"
    }
  };

  // Configuración de tamaños
  const sizes = {
    sm: {
      input: "px-3 py-1.5 text-sm",
      button: "px-3 py-1.5",
      icon: "w-4 h-4"
    },
    md: {
      input: "px-4 py-2 text-base",
      button: "px-4 py-2",
      icon: "w-5 h-5"
    },
    lg: {
      input: "px-5 py-3 text-lg",
      button: "px-5 py-3",
      icon: "w-6 h-6"
    }
  };

  const config = variants[variant] || variants.default;
  const sizeConfig = sizes[size] || sizes.md;

  // Debounce para búsqueda
  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (onChange) {
      onChange(newValue);
    }

    if (debounce > 0 && onSearch) {
      clearTimeout(window.searchTimeout);
      window.searchTimeout = setTimeout(() => {
        onSearch(newValue);
      }, debounce);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(localValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setLocalValue("");
    if (onChange) onChange("");
    if (onSearch) onSearch("");
  };

  return (
    <div className={`flex items-center gap-0 ${className}`}>

      {/* Input de búsqueda */}
      <div className="relative">
        <input
          type="text"
          value={value !== undefined ? value : localValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`
                        ${sizeConfig.input}
                        border-4 ${config.input}
                        text-hogwarts-wood
                        font-body
                        bg-hogwarts-parchment
                        ${config.shadow}
                        outline-none
                        transition-all duration-300
                        focus:translate-x-1 focus:translate-y-1 focus:shadow-none
                        hover:shadow-none hover:translate-x-1 hover:translate-y-1
                        placeholder:${config.placeholder}
                        ${isFocused ? 'translate-x-1 translate-y-1 shadow-none' : ''}
                        ${inputClassName}
                    `}
        />

        {/* Icono dentro del input (opcional sin botón) */}
        {!withButton && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        )}

        {/* Botón de limpiar (si hay texto) */}
        {(value !== undefined ? value : localValue) && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                            text-gray-400 hover:text-gryffindor-primary transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Botón de búsqueda */}
      {withButton && (
        <button
          onClick={handleSearch}
          className={`
                        ${sizeConfig.button}
                        border-4 border-l-0 ${config.input}
                        ${config.button}
                        ${config.shadow}
                        transition-all duration-300
                        hover:shadow-none hover:translate-x-1 hover:translate-y-1
                        group
                        ${buttonClassName}
                    `}
        >
          {buttonText ? (
            <span className="font-harry text-sm uppercase tracking-wider">
              {buttonText}
            </span>
          ) : (
            <svg className={`${sizeConfig.icon} ${config.icon} group-hover:scale-110 transition-transform`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}