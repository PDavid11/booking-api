import { v4 as uuid } from 'uuid'

export class AvailableSlot {
    private id: string
    private employeeId: string
    private startTime: Date
    private endTime: Date
    private isBooked: boolean

    constructor(employeeId: string, startTime: Date, endTime: Date, isBooked: boolean = false, id ?: string) {
        if (startTime >= endTime) {
            throw new Error('Start time must be before end time')
        }
        this.id = id || uuid()
        this.employeeId = employeeId
        this.startTime = startTime
        this.endTime = endTime
        this.isBooked = isBooked
    }

    get ID() { return this.id }
    get EmployeeId() { return this.employeeId }
    get StartTime() { return this.startTime }
    get EndTime() { return this.endTime }
    get IsBooked() { return this.isBooked }

    set IsBooked(newIsBooked: boolean) { this.isBooked = newIsBooked }
}