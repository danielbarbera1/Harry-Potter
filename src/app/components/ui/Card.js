// components/cards/Card.jsx
export default function Card({ 
    // Contenido principal
    children,
    titulo,
    subtitulo,
    imagen,
    altImagen = "",
    
    // Variante visual (define los colores)
    variant = "default", // gryffindor, slytherin, ravenclaw, hufflepuff, magic, dark, default
    
    // Badges y etiquetas
    badge,
    badgeIcon,
    
    // Métricas (opcionales)
    puntos,
    nivel,
    barraValor,
    barraColor,
    
    // Acciones
    onActionClick,
    actionText = "Ver Detalles",
    actionIcon = "✨",
    secondAction,
    
    // Footer personalizado (si quieres algo más complejo)
    footer,
    
    // Clases para personalización
    className = "",
    imageClassName = "",
    contentClassName = "",
    hoverEffect = true,
    
    ...props
}) {
    
    // Configuración de variantes (colores temáticos)
    const variants = {
        gryffindor: {
            headerBg: "bg-gryffindor-primary",
            headerBorder: "border-gryffindor-secondary",
            headerText: "text-gryffindor-secondary",
            badgeBg: "bg-gryffindor-primary",
            badgeText: "text-gryffindor-secondary",
            barBg: "bg-gryffindor-primary",
            buttonBg: "bg-gryffindor-primary",
            buttonHover: "hover:bg-gryffindor-secondary",
            buttonText: "text-gryffindor-secondary",
            icon: "🦁"
        },
        slytherin: {
            headerBg: "bg-slytherin-primary",
            headerBorder: "border-slytherin-secondary",
            headerText: "text-slytherin-secondary",
            badgeBg: "bg-slytherin-primary",
            badgeText: "text-slytherin-secondary",
            barBg: "bg-slytherin-primary",
            buttonBg: "bg-slytherin-primary",
            buttonHover: "hover:bg-slytherin-secondary",
            buttonText: "text-slytherin-secondary",
            icon: "🐍"
        },
        ravenclaw: {
            headerBg: "bg-ravenclaw-primary",
            headerBorder: "border-ravenclaw-secondary",
            headerText: "text-ravenclaw-secondary",
            badgeBg: "bg-ravenclaw-primary",
            badgeText: "text-ravenclaw-secondary",
            barBg: "bg-ravenclaw-primary",
            buttonBg: "bg-ravenclaw-primary",
            buttonHover: "hover:bg-ravenclaw-secondary",
            buttonText: "text-ravenclaw-secondary",
            icon: "🦅"
        },
        hufflepuff: {
            headerBg: "bg-hufflepuff-primary",
            headerBorder: "border-hufflepuff-secondary",
            headerText: "text-hufflepuff-secondary",
            badgeBg: "bg-hufflepuff-primary",
            badgeText: "text-hufflepuff-secondary",
            barBg: "bg-hufflepuff-primary",
            buttonBg: "bg-hufflepuff-primary",
            buttonHover: "hover:bg-hufflepuff-secondary",
            buttonText: "text-hufflepuff-secondary",
            icon: "🦡"
        },
        magic: {
            headerBg: "bg-purple-700",
            headerBorder: "border-purple-300",
            headerText: "text-purple-200",
            badgeBg: "bg-purple-700",
            badgeText: "text-purple-200",
            barBg: "bg-purple-600",
            buttonBg: "bg-purple-700",
            buttonHover: "hover:bg-purple-600",
            buttonText: "text-purple-200",
            icon: "🪄"
        },
        dark: {
            headerBg: "bg-hogwarts-wood",
            headerBorder: "border-gryffindor-secondary",
            headerText: "text-gryffindor-secondary",
            badgeBg: "bg-hogwarts-wood",
            badgeText: "text-gryffindor-secondary",
            barBg: "bg-gryffindor-primary",
            buttonBg: "bg-hogwarts-wood",
            buttonHover: "hover:bg-gryffindor-secondary",
            buttonText: "text-gryffindor-secondary",
            icon: "🏰"
        },
        default: {
            headerBg: "bg-hogwarts-parchment",
            headerBorder: "border-hogwarts-wood",
            headerText: "text-hogwarts-wood",
            badgeBg: "bg-gray-700",
            badgeText: "text-white",
            barBg: "bg-gryffindor-primary",
            buttonBg: "bg-hogwarts-parchment",
            buttonHover: "hover:bg-hogwarts-wood",
            buttonText: "text-hogwarts-wood",
            icon: "✨"
        }
    };

    const config = variants[variant] || variants.default;
    
    // Colores para la barra
    const barColors = {
        gryffindor: "bg-gryffindor-primary",
        slytherin: "bg-slytherin-primary",
        ravenclaw: "bg-ravenclaw-primary",
        hufflepuff: "bg-hufflepuff-primary",
        purple: "bg-purple-600",
        red: "bg-red-600",
        green: "bg-green-600",
        yellow: "bg-yellow-500",
        default: "bg-gryffindor-primary"
    };
    
    const barColorClass = barColors[barraColor] || barColors.default;
    const barWidth = barraValor ? `${Math.min(100, Math.max(0, barraValor))}%` : "0%";

    return (
        <div className={`
            max-w-sm 
            bg-hogwarts-parchment 
            border-4 border-hogwarts-wood 
            shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)]
            overflow-hidden 
            transition-all 
            ${hoverEffect ? 'hover:-translate-y-2 hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.3)]' : ''}
            h-full flex flex-col
            ${className}
        `} {...props}>
            
            {/* Cabecera */}
            <div className={`${config.headerBg} border-b-4 ${config.headerBorder} p-4 flex justify-between items-center`}>
                <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-2xl">{config.icon}</span>
                    <h3 className={`${config.headerText} font-harry text-xl uppercase tracking-wider truncate`}>
                        {titulo}
                    </h3>
                </div>
                {badge && (
                    <span className={`${config.badgeBg} border-2 border-gryffindor-secondary px-3 py-1 text-xs font-bold ${config.badgeText} rounded-full flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]`}>
                        {badgeIcon && <span>{badgeIcon}</span>}
                        {badge}
                    </span>
                )}
            </div>

            {/* Imagen (opcional) */}
            {imagen && (
                <div className={`bg-hogwarts-parchment p-4 h-64 flex items-center justify-center border-b-4 border-hogwarts-wood relative overflow-hidden ${imageClassName}`}>
                    <div className="absolute inset-0 bg-[url('/img/parchment-texture.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle,_#FFD700_1px,_transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                    <img src={imagen} alt={altImagen || titulo} className="h-full object-contain z-10 drop-shadow-[5px_5px_0px_rgba(0,0,0,0.2)] transition-transform hover:scale-110 duration-300" />
                </div>
            )}

            {/* Cuerpo */}
            <div className={`p-4 space-y-3 flex-grow bg-gradient-to-b from-hogwarts-parchment to-amber-50 ${contentClassName}`}>
                
                {/* Subtítulo */}
                {subtitulo && (
                    <p className="font-bold text-hogwarts-wood uppercase text-sm flex items-center gap-2">
                        <span className="text-gryffindor-primary">✦</span>
                        {subtitulo}
                        <span className="text-gryffindor-primary">✦</span>
                    </p>
                )}
                
                {/* Contenido personalizado (donde va la información específica) */}
                {children}
                
                {/* Puntos */}
                {puntos && (
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-hogwarts-wood font-bold">🏆 Puntos:</span>
                        <span className="text-gryffindor-primary font-bold text-lg">{puntos}</span>
                    </div>
                )}
                
                {/* Nivel */}
                {nivel && (
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-hogwarts-wood font-bold">📜 Nivel:</span>
                        <span className="text-gryffindor-primary font-bold">{nivel}</span>
                    </div>
                )}
                
                {/* Barra de progreso */}
                {barraValor !== null && (
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="font-bold text-hogwarts-wood">Poder Mágico</span>
                            <span className="text-gryffindor-primary font-bold">{barraValor}%</span>
                        </div>
                        <div className="w-full bg-gray-300 border-2 border-hogwarts-wood h-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden">
                            <div className={`${barColorClass} h-full transition-all duration-500`} style={{ width: barWidth }}>
                                <div className="h-full w-full bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Footer con botones */}
                {footer ? (
                    footer
                ) : (
                    <div className="space-y-2 mt-2">
                        {onActionClick && (
                            <button onClick={onActionClick} className={`
                                w-full ${config.buttonBg} border-4 border-gryffindor-secondary py-2 font-harry uppercase 
                                ${config.buttonText} transition-all duration-300
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]
                                hover:shadow-none hover:translate-x-1 hover:translate-y-1
                                flex items-center justify-center gap-2
                            `}>
                                <span>{actionIcon}</span> {actionText} <span>{actionIcon}</span>
                            </button>
                        )}
                        {secondAction && <div className="text-center">{secondAction}</div>}
                    </div>
                )}
            </div>
        </div>
    );
}