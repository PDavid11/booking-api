type ButtonProps = {
    text: string
    color?: string
    onClick: () => void
}

function Button ({text, color = "gray", onClick}: ButtonProps) {
    return (
        <button
            className="btn"
            style={{ backgroundColor: color}}
            onClick={onClick}
            >
                {text}
        </button>
    )
}

export default Button