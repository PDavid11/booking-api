type CalendarButtonProps = {
    time: string
    isAvailable?: boolean
    isSelected?: boolean
    onClick: (time: string) => void
}

function CalendarButton ({time, isAvailable = true, isSelected = false, onClick}: CalendarButtonProps) {
    return (
        <button
            className={`clndbtn ${isSelected ? "selected" : ""} ${!isAvailable ? 'disabled' : ""}`}
            style={{backgroundColor: isAvailable ? (isSelected ? "blue" : "green") : "grey"}}
            disabled={!isAvailable}
            onClick={() => onClick(time)}     
            >
                {time}
            </button>
    )
}

export default CalendarButton