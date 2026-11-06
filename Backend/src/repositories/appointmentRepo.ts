import { Pool } from "pg";
import { AppointmentStatus } from "../enums/enums.js";
import { Appointment } from "../models/Appointment.js";

export class AppointmentRepo {

    constructor(private pool : Pool) {}

    private toAppointment(row: any): Appointment {
        return new Appointment(
            row.guest_id,
            row.service_id,
            row.employee_id,
            new Date(row.start_time),
            new Date(row.end_time),
            row.slot_id,
            row.id,
            row.status,
            new Date(row.created_at)
        )
    }

    get Appointment(): Promise<Appointment[]> {
        return this.pool.query('SELECT * FROM appointments').then(res => res.rows.map(row => this.toAppointment(row)))
    }

    async getAll(): Promise<{success: boolean, reason?: string, result?: Appointment[]}> {
        const query = 'SELECT * FROM appointments'
        const res = await this.pool.query(query)

        if (res.rows.length < 1) {
            return {success: false, reason: "Not found"}
        }

        return {success: true, result: res.rows.map(row => this.toAppointment(row))}
    }

    async getByID(ID: string): Promise<{success: boolean, reason?: string, result?: Appointment}> {
        const query = 'SELECT * FROM appointments WHERE id = $1'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length === 0) {
            return {success : false, reason: "Not found"}
        }

        return {success: true, result: this.toAppointment(res.rows[0])}
    }

    async getByStatus(status: AppointmentStatus): Promise<{success: boolean, reason?: string, result?: Appointment[]}> {
        const query = 'SELECT * FROM appointments WHERE status = $1'
        const res = await this.pool.query(query, [status])

        if (res.rows.length < 1) {
            return {success: false, reason: "Not found"}
        }

        return {success: true, result: res.rows.map(row => this.toAppointment(row))}
    }

    async getByDate(date: Date): Promise<{success: boolean, reason?: string, result?: Appointment[]}> {
        const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        const query = 'SELECT * FROM appointments WHERE start_time >= $1 AND start_time < $2'
        const res = await this.pool.query(query, [start, end])

        if (res.rows.length < 1) {
            return {success: false, reason: "Not found"}
        }

        return {success: true, result: res.rows.map(row => this.toAppointment(row))}
    }

    async getByGuestID(ID: string): Promise<{success: boolean, reason?: string, result?: Appointment[]}> {
        const query = 'SELECT * FROM appointments WHERE guest_id = $1'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length < 1) {
            return {success: false, reason: "Not found"}
        }

        return {success: true, result: res.rows.map(row => this.toAppointment(row))}
    }

    async getByEmployeeID(ID: string): Promise<{success: boolean, reason?: string, result?: Appointment[]}> {
        const query = 'SELECT * FROM appointments WHERE employee_id = $1'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length < 1) {
            return {success: false, reason: "Not found"}
        }

        return {success: true, result: res.rows.map(row => this.toAppointment(row))}
    }

    async delete(ID: string): Promise<{success: boolean, reason?: string}> {
        const query = 'DELETE FROM appointments WHERE id = $1 RETURNING *'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true}
    }

    async confirmAppointment(ID: string): Promise<{success: boolean, reason?: string}> {
        const found = await this.getByID(ID)
        if (!found.success || !found.result) {
            return {success: false, reason: "Not found"}
        }

        found.result.confirm()
        const query = 'UPDATE appointments SET status = $1 WHERE id = $2'
        await this.pool.query(query, [found.result.Status, ID])
        return {success: true}
    }

    async rejectAppointment(ID: string): Promise<{success: boolean, reason?: string}> {
        const found = await this.getByID(ID)
        if (!found.success || !found.result) {
            return {success: false, reason: "Not found"}
        }

        found.result.reject()
        const query = 'UPDATE appointments SET status = $1 WHERE id = $2'
        await this.pool.query(query, [found.result.Status, ID])
        return {success: true}
    }

    async cancelAppointment(ID: string): Promise<{success: boolean, reason?: string}> {
        const found = await this.getByID(ID)
        if (!found.success || !found.result) {
            return {success: false, reason: "Not found"}
        }

        found.result.cancel()
        const query = 'UPDATE appointments SET status = $1 WHERE id = $2'
        await this.pool.query(query, [found.result.Status, ID])
        return {success: true}
    }

    async add(guestID: string, serviceID: string, employeeID: string, slotID: string, startTime: Date, endTime: Date): Promise<{success: boolean, reason?: string}> {
        const conflictQuery = `SELECT * FROM appointments
            WHERE employee_id = $1
            AND status NOT IN ($2, $3)
            AND NOT (start_time >= $5 OR end_time <= $4)`
        const conflict = await this.pool.query(conflictQuery, [
            employeeID,
            AppointmentStatus.CANCELLED,
            AppointmentStatus.REJECTED,
            startTime,
            endTime
        ])

        if (conflict.rows.length > 0) {
            return {success: false, reason: "Appointment conflict"}
        }

        const appointment = new Appointment(guestID, serviceID, employeeID, startTime, endTime, slotID)
        const query = `INSERT INTO appointments (id, guest_id, service_id, employee_id, slot_id, start_time, end_time, status, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
        await this.pool.query(query, [
            appointment.ID,
            appointment.GuestID,
            appointment.ServiceID,
            appointment.EmployeeID,
            appointment.SlotID,
            appointment.StartTime,
            appointment.EndTime,
            appointment.Status,
            appointment.CreatedAt
        ])

        return {success: true}
    }
}
