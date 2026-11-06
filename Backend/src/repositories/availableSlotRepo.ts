import { Pool } from "pg";
import { AvailableSlot } from "../models/AvailableSlot.js"

export class AvailableSlotRepo {

    constructor(private pool : Pool) {}

    private toSlot(row: any): AvailableSlot {
        return new AvailableSlot(row.employeeid, new Date(row.starttime), row.isbooked, row.id)
    }

    get AvailableSlot(): Promise<AvailableSlot[]> {
        return this.pool.query('SELECT * FROM available_slots').then(res => res.rows.map(row => this.toSlot(row)))
    }

    async getAll(): Promise<{success: boolean, reason?: string, result?: AvailableSlot[]}> {
        const query = 'SELECT * FROM available_slots'
        const res = await this.pool.query(query)

        if (res.rows.length < 1) {
            return {success: false, reason: "Not found"}
        }

        return {success: true, result: res.rows.map(row => this.toSlot(row))}
    }

    async getByID(ID: string): Promise<{success: boolean, reason?: string, result?: AvailableSlot}> {
        const query = 'SELECT * FROM available_slots WHERE id = $1'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true, result: this.toSlot(res.rows[0])}
    }

    async add(employeeId: string, startTime: Date, isBooked: boolean): Promise<{result: string}> {
        const newAvailableSlot = new AvailableSlot(employeeId, startTime, isBooked)
        const query = 'INSERT INTO available_slots (id, employeeid, starttime, isbooked) VALUES ($1, $2, $3, $4)'
        await this.pool.query(query, [newAvailableSlot.ID, newAvailableSlot.EmployeeId, newAvailableSlot.StartTime, newAvailableSlot.IsBooked])

        return {result : "slot added successfully"}
    }

    async delete(ID: string): Promise<{success: boolean, reason?: string}> {
        const query = 'DELETE FROM available_slots WHERE id = $1 RETURNING *'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true, reason: "Slot deleted successfully"}
    }

    async modifySlot(ID: string, isBooked: boolean): Promise<{success: boolean, reason?: string}> {
        const query = 'UPDATE availableslots SET isbooked = $1 WHERE id = $2 RETURNING *'
        const res = await this.pool.query(query, [isBooked, ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Slot not found"}
        }

        return {success: true, reason: "Slot modified successfully"}
    }
}
