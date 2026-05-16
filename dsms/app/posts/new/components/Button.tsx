interface ButtonProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'danger';
    onClick: () => void;
}

export default function Button({ title, variant = "primary", onClick }: ButtonProps) {
    const variants: Record<string, string> = {
        primary: "bg-primary-500 hover:bg-primary-600 text-white",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
        danger: "bg-red-500 hover:bg-red-600 text-white",
    }

    return (
        <button
            className={`
                flex items-center justify-center px-4 py-3
                w-full rounded-2xl
                typo-subtitle font-semibold
                ${variants[variant] ?? variants['primary']}
            `}
            onClick={onClick}
        >
            {title}
        </button>
    )
}