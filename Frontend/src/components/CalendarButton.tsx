type CalendarButtonProps = {
    time: string
    isAvailable?: boolean
    onClick: (time: string) => void
}

function CalendarButton ({time, isAvailable = true, onClick}: CalendarButtonProps) {
    return (
        <button
            className="clndbtn"
            style={{backgroundColor: isAvailable ? "green" : "grey"}}
            onClick={() => onClick(time)}
            disabled={!isAvailable}
            >
                {time}
            </button>
    )
}

export default CalendarButton