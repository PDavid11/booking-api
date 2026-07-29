import Button from './Button'
import type { AppointmentCard } from '../types/types'

interface AdminCardProps {
    
    appointment: AppointmentCard

    onConfirm?: (id: string) => void
    onCancel?: (id: string) => void
}

export default function AdminCard({ appointment, onConfirm, onCancel }: AdminCardProps) {

    const formateDateAndTime = (isoString: string) => {

        if (!isoString) return { date: '', time: '' }

        const [date, timeWithMs] = isoString.split('T')
        const time = timeWithMs.slice(0, 5) 

        return { date, time }
    }

    const { date, time } = formateDateAndTime(appointment.startTime)


    return (
        <div>
            <h3>{appointment.guestName}</h3>
            <p>Date: {date} - Time: {time}</p>
            <p>Phone: {appointment.phone}</p>
            <p>Status: {appointment.status}</p>

            <Button
                text="Confirm"
                color="green"
                onClick={() => alert(`Confirmed : ${appointment.guestName}`)}
                />
            <Button
                text="Cancel"
                color="red"
                onClick={() => alert(`Cancelled : ${appointment.guestName}`)}
                />
        </div>
    )
}