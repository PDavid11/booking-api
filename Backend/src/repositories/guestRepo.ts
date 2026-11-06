import { Pool } from "pg";
import { Guest } from "../models/Guest.js";

export class GuestRepo {

    constructor(private pool : Pool) {}

    async getByID(ID: string): Promise<{success: boolean, reason?: string, result?: Guest}> {
        const query = 'SELECT * FROM guests WHERE id = $1'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        const row = res.rows[0]
        const guest = new Guest(row.name, row.phone, row.id)
        return {success: true, result: guest}
    }

    async getByPhone(phone: string): Promise<{success: boolean, reason?: string, result?: Guest}> {
        const query = 'SELECT * FROM guests WHERE phone = $1'
        const res = await this.pool.query(query, [phone])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        const row = res.rows[0]
        const guest = new Guest(row.name, row.phone, row.id)

        return {success: true, result: guest}
    }

    async add(name: string, phone: string): Promise <{result : Guest}> {
        const newGuest = new Guest(name, phone)
        const query = 'INSERT INTO guests (id, name, phone) VALUES ($1, $2, $3)'
        await this.pool.query(query, [newGuest.ID, newGuest.Name, newGuest.Phone])

        return {result: newGuest}
    }

    async delete(ID: string): Promise<{success: boolean, reason?: string}> {
        const query = 'DELETE FROM guests WHERE id = $1 RETURNING *'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true}
    }
}