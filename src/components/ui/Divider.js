// components/divider/Divider.jsx
export default function Divider({
    variant = "default",      // default, gryffindor, slytherin, ravenclaw, hufflepuff, magic
    type = "line",            // line, dotted, dashed, double, wavy
    withIcon = false,
    icon = "✨",
    iconPosition = "center",  // left, center, right
    text = "",
    textPosition = "center",  // left, center, right
    thickness = "md",         // sm, md, lg
    className = ""
}) {

    // Configuración de variantes de color
    const variants = {
        gryffindor: {
            bg: "bg-gryffindor-primary",
            border: "border-gryffindor-primary",
            text: "text-gryffindor-primary"
        },
        slytherin: {
            bg: "bg-slytherin-primary",
            border: "border-slytherin-primary",
            text: "text-slytherin-primary"
        },
        ravenclaw: {
            bg: "bg-ravenclaw-primary",
            border: "border-ravenclaw-primary",
            text: "text-ravenclaw-primary"
        },
        hufflepuff: {
            bg: "bg-hufflepuff-primary",
            border: "border-hufflepuff-primary",
            text: "text-hufflepuff-primary"
        },
        magic: {
            bg: "bg-purple-600",
            border: "border-purple-600",
            text: "text-purple-600"
        },
        default: {
            bg: "bg-gryffindor-secondary",
            border: "border-gryffindor-secondary",
            text: "text-gryffindor-secondary"
        }
    };

    // Configuración de tipos de línea
    const lineTypes = {
        line: "border-t",
        dotted: "border-t border-dotted",
        dashed: "border-t border-dashed",
        double: "border-t-4 border-double",
        wavy: "border-t border-wavy" // requiere CSS personalizado
    };

    // Configuración de grosores
    const thicknesses = {
        sm: "border-t",
        md: "border-t-2",
        lg: "border-t-4"
    };

    const config = variants[variant] || variants.default;
    const lineType = type === "wavy" ? "border-t" : lineTypes[type] || lineTypes.line;
    const thicknessClass = thicknesses[thickness] || thicknesses.md;

    // Si tiene texto o ícono, mostrar divider con contenido
    if (text || withIcon) {
        const positions = {
            left: "justify-start",
            center: "justify-center",
            right: "justify-end"
        };

        return (
            <div className={`relative flex items-center ${positions[textPosition]} w-full ${className}`}>
                <div className={`flex-grow ${thicknessClass} ${lineType} ${config.border}`}></div>
                <div className={`flex items-center gap-2 px-4 ${config.text}`}>
                    {withIcon && <span className="text-xl">{icon}</span>}
                    {text && <span className="font-harry text-sm uppercase tracking-wider">{text}</span>}
                    {withIcon && <span className="text-xl">{icon}</span>}
                </div>
                <div className={`flex-grow ${thicknessClass} ${lineType} ${config.border}`}></div>
            </div>
        );
    }

    // Divider simple con ícono en el centro (sin texto)
    if (withIcon && !text) {
        return (
            <div className={`relative flex items-center justify-center w-full ${className}`}>
                <div className={`flex-grow ${thicknessClass} ${lineType} ${config.border}`}></div>
                <div className={`mx-4 text-2xl ${config.text}`}>{icon}</div>
                <div className={`flex-grow ${thicknessClass} ${lineType} ${config.border}`}></div>
            </div>
        );
    }

    // Divider simple solo línea
    return (
        <div className={`w-full ${thicknessClass} ${lineType} ${config.border} ${className}`}></div>
    );
}