// components/skeleton/Skeleton.jsx
export default function Skeleton({
    variant = "card",      // card, text, avatar, image, button, circle, rectangle
    width = "full",        // sm, md, lg, full, o valor personalizado (ej: "w-32")
    height = "auto",       // sm, md, lg, auto, o valor personalizado (ej: "h-32")
    count = 1,
    gap = 4,
    animate = true,
    className = "",
    ...props
}) {

    // Configuración de variantes predefinidas
    const variantsConfig = {
        card: {
            defaultWidth: "w-full",
            defaultHeight: "h-64",
            rounded: "rounded-xl",
            additional: ""
        },
        text: {
            defaultWidth: "w-full",
            defaultHeight: "h-4",
            rounded: "rounded",
            additional: ""
        },
        avatar: {
            defaultWidth: "w-12",
            defaultHeight: "h-12",
            rounded: "rounded-full",
            additional: ""
        },
        image: {
            defaultWidth: "w-full",
            defaultHeight: "h-48",
            rounded: "rounded-lg",
            additional: ""
        },
        button: {
            defaultWidth: "w-32",
            defaultHeight: "h-10",
            rounded: "rounded-lg",
            additional: ""
        },
        circle: {
            defaultWidth: "w-16",
            defaultHeight: "h-16",
            rounded: "rounded-full",
            additional: ""
        },
        rectangle: {
            defaultWidth: "w-full",
            defaultHeight: "h-32",
            rounded: "rounded-lg",
            additional: ""
        },
        title: {
            defaultWidth: "w-3/4",
            defaultHeight: "h-8",
            rounded: "rounded",
            additional: ""
        },
        subtitle: {
            defaultWidth: "w-1/2",
            defaultHeight: "h-5",
            rounded: "rounded",
            additional: ""
        }
    };

    // Mapeo de tamaños predefinidos
    const sizeMap = {
        sm: "w-16 h-16",
        md: "w-32 h-32",
        lg: "w-48 h-48",
        full: "w-full h-auto",
        auto: "w-full h-auto"
    };

    const variantConfig = variantsConfig[variant] || variantsConfig.card;

    // Determinar ancho
    let widthClass = variantConfig.defaultWidth;
    if (width !== "full" && width !== "auto") {
        if (sizeMap[width]) {
            widthClass = sizeMap[width].split(" ")[0];
        } else {
            widthClass = width;
        }
    } else if (width === "full") {
        widthClass = "w-full";
    } else if (width === "auto") {
        widthClass = "w-auto";
    }

    // Determinar alto
    let heightClass = variantConfig.defaultHeight;
    if (height !== "auto") {
        if (sizeMap[height]) {
            heightClass = sizeMap[height].split(" ")[1] || sizeMap[height];
        } else {
            heightClass = height;
        }
    } else if (height === "auto") {
        heightClass = "h-auto";
    }

    // Clases base del skeleton
    const baseClasses = `
        ${widthClass}
        ${heightClass}
        ${variantConfig.rounded}
        bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
        ${animate ? 'animate-pulse' : ''}
        ${variantConfig.additional}
        ${className}
    `;

    // Si count > 1, mostrar grid
    if (count > 1) {
        return (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(count, 4)} gap-${gap}`}>
                {[...Array(count)].map((_, i) => (
                    <div key={i} className={baseClasses} {...props} />
                ))}
            </div>
        );
    }

    return <div className={baseClasses} {...props} />;
}