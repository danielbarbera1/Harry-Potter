// components/buttons/Button.jsx
export default function Button({ 
    children,
    variant = "gryffindor",
    size = "md",
    icon = null,
    iconPosition = "left",
    onClick,
    disabled = false,
    type = "button",
    className = "",
    fullWidth = false,
    animated = true,
    ...props
}) {
    
    // Configuración de variantes (colores y efectos)
    const variants = {
        // Casas de Hogwarts
        gryffindor: {
            bg: "bg-gryffindor-primary",
            border: "border-gryffindor-secondary",
            text: "text-gryffindor-secondary",
            hover: "hover:bg-gryffindor-secondary hover:text-gryffindor-primary",
            shadow: "shadow-[4px_4px_0px_0px_rgba(255,197,0,0.5)]",
        },
        slytherin: {
            bg: "bg-slytherin-primary",
            border: "border-slytherin-secondary",
            text: "text-slytherin-secondary",
            hover: "hover:bg-slytherin-secondary hover:text-slytherin-primary",
            shadow: "shadow-[4px_4px_0px_0px_rgba(170,170,170,0.5)]",
        },
        ravenclaw: {
            bg: "bg-ravenclaw-primary",
            border: "border-ravenclaw-secondary",
            text: "text-ravenclaw-secondary",
            hover: "hover:bg-ravenclaw-secondary hover:text-ravenclaw-primary",
            shadow: "shadow-[4px_4px_0px_0px_rgba(148,107,45,0.5)]",
        },
        hufflepuff: {
            bg: "bg-hufflepuff-primary",
            border: "border-hufflepuff-secondary",
            text: "text-hufflepuff-secondary",
            hover: "hover:bg-hufflepuff-secondary hover:text-hufflepuff-primary",
            shadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]",
        },
        // Estilos adicionales
        hogwarts: {
            bg: "bg-hogwarts-wood",
            border: "border-gryffindor-secondary",
            text: "text-gryffindor-secondary",
            hover: "hover:bg-gryffindor-secondary hover:text-hogwarts-wood",
            shadow: "shadow-[4px_4px_0px_0px_rgba(139,69,19,0.5)]",
        },
        magic: {
            bg: "bg-purple-700",
            border: "border-purple-300",
            text: "text-purple-200",
            hover: "hover:bg-purple-500 hover:text-white",
            shadow: "shadow-[4px_4px_0px_0px_rgba(128,0,128,0.5)]",
        },
        outline: {
            bg: "bg-transparent",
            border: "border-gryffindor-secondary",
            text: "text-gryffindor-secondary",
            hover: "hover:bg-gryffindor-secondary hover:text-gryffindor-primary",
            shadow: "shadow-none",
        },
        danger: {
            bg: "bg-red-700",
            border: "border-red-300",
            text: "text-red-200",
            hover: "hover:bg-red-500 hover:text-white",
            shadow: "shadow-[4px_4px_0px_0px_rgba(185,28,28,0.5)]",
        },
        success: {
            bg: "bg-green-700",
            border: "border-green-300",
            text: "text-green-200",
            hover: "hover:bg-green-500 hover:text-white",
            shadow: "shadow-[4px_4px_0px_0px_rgba(21,128,61,0.5)]",
        }
    };

    // Configuración de tamaños
    const sizes = {
        xs: "px-3 py-1.5 text-xs",
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl"
    };

    const config = variants[variant] || variants.gryffindor;
    const sizeClass = sizes[size] || sizes.md;

    // Icono por defecto según la variante si no se proporciona
    const defaultIcons = {
        gryffindor: "🦁",
        slytherin: "🐍",
        ravenclaw: "🦅",
        hufflepuff: "🦡",
        hogwarts: "🏰",
        magic: "🪄",
        outline: "✨",
        danger: "⚠️",
        success: "✓"
    };

    const finalIcon = icon !== undefined ? icon : defaultIcons[variant];

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                relative ${config.bg} ${sizeClass}
                border-4 ${config.border} ${config.text}
                font-harry uppercase tracking-wider
                ${config.shadow}
                ${fullWidth ? 'w-full' : ''}
                ${animated 
                    ? 'hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300' 
                    : ''
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:translate-x-0 disabled:hover:translate-y-0
                group overflow-hidden
                ${className}
            `}
            {...props}
        >
            {/* Efecto de brillo mágico */}
            <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </span>
            
            {/* Efecto de polvo de hadas */}
            {animated && (
                <span className="absolute inset-0 pointer-events-none">
                    <span className="absolute -top-2 -left-2 text-yellow-300 text-xs 
                        animate-ping opacity-0 group-hover:opacity-100 transition-opacity">
                        ✨
                    </span>
                    <span className="absolute -bottom-2 -right-2 text-yellow-300 text-xs 
                        animate-ping opacity-0 group-hover:opacity-100 transition-opacity 
                        delay-150">
                        ✨
                    </span>
                </span>
            )}
            
            {/* Contenido del botón */}
            <span className="relative flex items-center justify-center gap-2">
                {iconPosition === "left" && finalIcon && (
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                        {finalIcon}
                    </span>
                )}
                <span className="tracking-wider">{children}</span>
                {iconPosition === "right" && finalIcon && (
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                        {finalIcon}
                    </span>
                )}
            </span>
        </button>
    );
}