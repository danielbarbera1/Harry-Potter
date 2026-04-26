// components/hero/Hero.jsx
export default function Hero({
  children,
  title,
  subtitle,
  description,
  buttonText,
  buttonLink = "#",
  onButtonClick,
  backgroundImage,
  variant = "gryffindor",
  withOverlay = true,
  overlayOpacity = "50",
  align = "center", // center, left, right
  showIcon = true,
  icon = "🪄",
  showScrollDown = false,
  className = ""
}) {

  // Configuración de variantes
  const variants = {
    gryffindor: {
      button: "bg-gryffindor-primary hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-gryffindor-primary border-gryffindor-secondary",
      title: "text-gryffindor-secondary",
      subtitle: "text-gryffindor-secondary/80",
      description: "text-hogwarts-parchment",
      icon: "🦁"
    },
    slytherin: {
      button: "bg-slytherin-primary hover:bg-slytherin-secondary text-slytherin-secondary hover:text-slytherin-primary border-slytherin-secondary",
      title: "text-slytherin-secondary",
      subtitle: "text-slytherin-secondary/80",
      description: "text-hogwarts-parchment",
      icon: "🐍"
    },
    ravenclaw: {
      button: "bg-ravenclaw-primary hover:bg-ravenclaw-secondary text-ravenclaw-secondary hover:text-ravenclaw-primary border-ravenclaw-secondary",
      title: "text-ravenclaw-secondary",
      subtitle: "text-ravenclaw-secondary/80",
      description: "text-hogwarts-parchment",
      icon: "🦅"
    },
    hufflepuff: {
      button: "bg-hufflepuff-primary hover:bg-hufflepuff-secondary text-hufflepuff-secondary hover:text-hufflepuff-primary border-hufflepuff-secondary",
      title: "text-hufflepuff-secondary",
      subtitle: "text-hufflepuff-secondary/80",
      description: "text-hogwarts-parchment",
      icon: "🦡"
    },
    magic: {
      button: "bg-purple-700 hover:bg-purple-500 text-white border-purple-300",
      title: "text-purple-200",
      subtitle: "text-purple-200/80",
      description: "text-purple-100",
      icon: "🪄"
    },
    dark: {
      button: "bg-hogwarts-wood hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-hogwarts-wood border-gryffindor-secondary",
      title: "text-gryffindor-secondary",
      subtitle: "text-gryffindor-secondary/80",
      description: "text-hogwarts-parchment",
      icon: "🏰"
    },
    default: {
      button: "bg-gryffindor-primary hover:bg-gryffindor-secondary text-gryffindor-secondary hover:text-gryffindor-primary border-gryffindor-secondary",
      title: "text-gryffindor-secondary",
      subtitle: "text-gryffindor-secondary/80",
      description: "text-hogwarts-parchment",
      icon: "✨"
    }
  };

  // Alineaciones
  const alignClasses = {
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end"
  };

  const config = variants[variant] || variants.default;
  const finalIcon = showIcon ? (icon || config.icon) : null;

  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>

      {/* Imagen de fondo */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Overlay */}
          {withOverlay && (
            <div className={`absolute inset-0 bg-black/${overlayOpacity} bg-gradient-to-b from-black/60 via-black/40 to-black/70`}></div>
          )}

          {/* Efecto de niebla */}
          <div className="absolute inset-0 bg-gradient-to-t from-hogwarts-stone/20 via-transparent to-hogwarts-stone/20"></div>

          {/* Estrellas */}
          <div className="absolute inset-0 bg-stars opacity-30 pointer-events-none"></div>
        </div>
      )}

      {/* Contenido */}
      <div className={`relative z-10 container mx-auto px-4 flex flex-col justify-center ${alignClasses[align]}`}>

        {/* Ícono */}
        {finalIcon && (
          <div className={`mb-6 ${align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right'}`}>
            <span className="text-6xl md:text-7xl drop-shadow-lg animate-bounce inline-block">
              {finalIcon}
            </span>
          </div>
        )}

        {/* Título */}
        {title && (
          <h1 className={`font-harry text-5xl md:text-6xl lg:text-7xl ${config.title} mb-4 tracking-wider [text-shadow:4px_4px_0px_rgba(0,0,0,0.5)] animate-flicker ${align === 'center' ? 'mx-auto' : ''}`}>
            {title}
          </h1>
        )}

        {/* Subtítulo */}
        {subtitle && (
          <p className={`text-lg md:text-xl ${config.subtitle} mb-4 ${align === 'center' ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}

        {/* Descripción */}
        {description && (
          <p className={`text-sm md:text-base max-w-2xl ${config.description} mb-8 ${align === 'center' ? 'mx-auto' : ''}`}>
            {description}
          </p>
        )}

        {/* Children (contenido personalizado) */}
        {children && (
          <div className={`mb-8 ${align === 'center' ? 'text-center' : ''}`}>
            {children}
          </div>
        )}

        {/* Botón */}
        {buttonText && (
          buttonLink ? (
            <a
              href={buttonLink}
              className={`inline-block px-8 py-3 border-4 rounded-lg font-harry text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 ${config.button} ${align === 'center' ? 'mx-auto' : ''}`}
            >
              {buttonText}
            </a>
          ) : (
            <button
              onClick={onButtonClick}
              className={`inline-block px-8 py-3 border-4 rounded-lg font-harry text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 ${config.button} ${align === 'center' ? 'mx-auto' : ''}`}
            >
              {buttonText}
            </button>
          )
        )}
      </div>

      {/* Flecha hacia abajo (opcional) */}
      {showScrollDown && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <span className="text-3xl text-gryffindor-secondary cursor-pointer hover:scale-110 transition-transform">
            ↓
          </span>
        </div>
      )}
    </div>
  );
}