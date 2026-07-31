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

        const dateObj = new Date(isoString)
        const date = dateObj.toLocaleDateString('hu-HU')

        const time = dateObj.toLocaleTimeString('hu-HU', {
            hour: '2-digit',
            minute: '2-digit'
        })

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
                onClick={() => (alert(`Confirmed : ${appointment.guestName}`), onConfirm && onConfirm(appointment.id))}
                />
            <Button
                text="Cancel"
                color="red"
                onClick={() => (alert(`Cancelled : ${appointment.guestName}`), onCancel && onCancel(appointment.id))}
                />
        </div>
    )
}