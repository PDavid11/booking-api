import Button from "./Button";
import type { AppointmentCard } from "../types/types";

interface AdminCardProps {
  appointment: AppointmentCard;
  onConfirm?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export default function AdminCard({ appointment, onConfirm, onCancel }: AdminCardProps) {
  const formateDateAndTime = (isoString: string) => {
    if (!isoString) return { date: "", time: "" };

    const dateObj = new Date(isoString);
    const date = dateObj.toLocaleDateString("hu-HU");
    const time = dateObj.toLocaleTimeString("hu-HU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return { date, time };
  };

  const { date, time } = formateDateAndTime(appointment.startTime);

  return (
    <div className="rounded-[12px] border border-line bg-surface p-5">
      <h3 className="text-lg font-semibold">{appointment.guestName}</h3>
      <p className="mt-2 text-sm text-muted">
        <span className="font-semibold text-ink">Dátum:</span> {date} {time}
      </p>
      <p className="mt-1 text-sm text-muted">
        <span className="font-semibold text-ink">Telefon:</span> {appointment.phone}
      </p>
      <p className="mt-1 text-sm text-muted">
        <span className="font-semibold text-ink">Státusz:</span> {appointment.status}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          text="Confirm"
          variant="primary"
          onClick={() => (
            alert(`Confirmed : ${appointment.guestName}`),
            onConfirm && onConfirm(appointment.id)
          )}
        />
        <Button
          text="Cancel"
          variant="danger"
          onClick={() => (
            alert(`Cancelled : ${appointment.guestName}`),
            onCancel && onCancel(appointment.id)
          )}
        />
      </div>
    </div>
  );
}
