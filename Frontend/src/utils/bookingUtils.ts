import {TIME_SLOTS} from "../constants/timeSlots";
import type { Service, Appointment } from "../types/types";


type AvailabilityParams = {
    slotTime: string
    selectedEmployee: string | null
    selectedService: string | null
    selectedDate: string
    services: Service[]
    existingAppointments: Appointment[]
}

export const checkIsSlotAvailable = ({
    slotTime,
    selectedEmployee,
    selectedService,
    selectedDate,
    services,
    existingAppointments
}: AvailabilityParams): boolean => {
    if (!selectedEmployee || !selectedService || !selectedDate) {
        return false
    }

    const currentService = services.find(s => s.id === selectedService)
    if (!currentService) {
        return false
    }

    const requiredSlotsCount = Math.ceil(currentService.durationMinutes / 30)

    const currentIndex = TIME_SLOTS.indexOf(slotTime as any)
    if (currentIndex === -1 || currentIndex + requiredSlotsCount > TIME_SLOTS.length) {
        return false
    }

    for (let i = 0 ; i < requiredSlotsCount; i++) {

        const checkTime = TIME_SLOTS[currentIndex + i]

        const isSlotTaken = existingAppointments.some((app) => {
            const [appDate, appTimeWithSec] = app.startTime.split("T")
            const appTime = appTimeWithSec.substring(0, 5)

            return (
                app.employeeID === selectedEmployee &&
                appDate === selectedDate &&
                appTime === checkTime
            )
        })

        if (isSlotTaken) {
            return false
        }
    }
    return true
}