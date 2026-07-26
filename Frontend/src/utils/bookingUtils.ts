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

    const currentService = services.find(service => service.id === selectedService)
    if (!currentService) {
        return false
    }

    const slotStart = new Date(`${selectedDate}T${slotTime}:00`)
    const slotEnd = new Date(slotStart.getTime() + currentService.durationMinutes * 60000)

    const endHours = slotEnd.getHours();
    const endMinutes = slotEnd.getMinutes();

    if (endHours > 18 || (endHours === 18 && endMinutes > 0)) {
    return false;
    }

    for (const app of existingAppointments) {
        const appEmployeeID = app.employeeID || (app as any).EmployeeID

        if (appEmployeeID !== selectedEmployee) {
            continue
        }

        const appStart = new Date(app.startTime)

        const appService = services.find(s => s.id === app.serviceID || (app as any).ServiceID)
        const appDuration = appService ? appService.durationMinutes : 30
        const appEnd = app.endTime
            ? new Date(app.endTime)
            : new Date(appStart.getTime() + appDuration * 60000)

        const isOverlap = (slotStart < appEnd) && (slotEnd > appStart)
        if (isOverlap) {
            return false
        }
    }
    return true
}