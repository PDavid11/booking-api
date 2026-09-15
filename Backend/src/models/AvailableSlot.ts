import { v4 as uuid } from 'uuid'

export class AvailableSlot {
    private id: string
    private employeeId: string
    private startTime: Date
    private isBooked: boolean

    constructor(employeeId: string, startTime: Date, isBooked: boolean = false, id ?: string) {
        this.id = id || uuid()
        this.employeeId = employeeId
        this.startTime = startTime
        this.isBooked = isBooked
    }

    get ID() { return this.id }
    get EmployeeId() { return this.employeeId }
    get StartTime() { return this.startTime }
    get IsBooked() { return this.isBooked }

    set IsBooked(newIsBooked: boolean) { this.isBooked = newIsBooked }
}