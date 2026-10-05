type CalendarButtonProps = {
  time: string;
  isAvailable?: boolean;
  isSelected?: boolean;
  onClick: (time: string) => void;
};

function CalendarButton({
  time,
  isAvailable = true,
  isSelected = false,
  onClick,
}: CalendarButtonProps) {
  const stateClass = !isAvailable
    ? "cursor-not-allowed bg-canvas text-muted"
    : isSelected
      ? "bg-accent text-white"
      : "bg-surface text-ink border border-line hover:border-accent";

  return (
    <button
      type="button"
      className={`rounded-[12px] px-3 py-2.5 text-sm font-semibold transition duration-150 active:scale-[0.98] ${stateClass}`}
      disabled={!isAvailable}
      onClick={() => onClick(time)}
    >
      {time}
    </button>
  );
}

export default CalendarButton;
