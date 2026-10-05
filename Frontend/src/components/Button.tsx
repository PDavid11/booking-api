type ButtonProps = {
  text: string;
  color?: string;
  variant?: "primary" | "secondary" | "danger";
  onClick: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

function Button({
  text,
  color,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-accent text-white hover:bg-accent-hover",
    secondary:
      "bg-surface text-ink border border-line hover:border-ink",
    danger:
      "bg-ink text-white hover:bg-ink/85",
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-[12px] px-5 py-2.5 text-sm font-semibold transition duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${color ? "text-white" : variants[variant]}`}
      style={color ? { backgroundColor: color } : undefined}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
