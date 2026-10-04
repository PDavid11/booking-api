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
        <div className="admin-card">
            <h3>{appointment.guestName}</h3>
            <p><strong>Dátum:</strong> {date} - {time}</p>
            <p><strong>Telefon:</strong> {appointment.phone}</p>
            <p><strong>Státusz:</strong> {appointment.status}</p>

            <div className="admin-card-actions">
                <Button
                    text="Confirm"
                    color="#4caf50"
                    onClick={() => (alert(`Confirmed : ${appointment.guestName}`), onConfirm && onConfirm(appointment.id))}
                />
                <Button
                    text="Cancel"
                    color="#e53935"
                    onClick={() => (alert(`Cancelled : ${appointment.guestName}`), onCancel && onCancel(appointment.id))}
                />
            </div>
        </div>
    )
}