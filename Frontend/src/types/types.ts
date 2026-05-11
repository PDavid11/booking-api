export type Employee = {
    id: string
    name : string
    phone : string
    instagram : string
    role : string
}

export type Service = {
    id: string
    name : string
    durationMinutes : number
    price : number
}

export type Appointment = {
    id : string
    guestID: string
    employeeID: string
    serviceID: string
    startTime: string
    endTime: string
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "REJECTED"
    createdAt: string
}