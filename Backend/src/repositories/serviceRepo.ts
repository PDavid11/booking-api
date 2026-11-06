import { Pool } from "pg";
import { Service } from "../models/Service.js";

export class ServiceRepo {

    constructor(private pool : Pool) {}

    private toService(row: any): Service {
        return new Service(row.name, Number(row.durationminutes), Number(row.price), row.id)
    }

    get Service(): Promise<Service[]> {
        return this.getAll()
    }

    async getAll(): Promise<Service[]> {
        const query = 'SELECT * FROM services'
        const res = await this.pool.query(query)
        return res.rows.map(row => this.toService(row))
    }

    async getByID(ID: string): Promise<{success: boolean, reason?: string, result?: Service}> {
        const query = 'SELECT * FROM services WHERE id = $1'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true, result: this.toService(res.rows[0])}
    }

    async add(name: string, durationMinutes: number, price: number): Promise<{result: Service}> {
        const NewService = new Service(name, durationMinutes, price)
        const query = 'INSERT INTO services (id, name, durationminutes, price) VALUES ($1, $2, $3, $4)'
        await this.pool.query(query, [NewService.ID, NewService.Name, NewService.DurationMinutes, NewService.Price])

        return {result: NewService}
    }

    async delete(ID: string): Promise<{success: boolean, reason?: string}> {
        const query = 'DELETE FROM services WHERE id = $1 RETURNING *'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length === 0) {
            return { success: false, reason: "Not found"}
        }

        return { success: true }
    }

    async modifyName(ID: string, newName: string): Promise<{success: boolean, reason?: string}> {
        const query = 'UPDATE services SET name = $1 WHERE id = $2 RETURNING *'
        const res = await this.pool.query(query, [newName, ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true}
    }

    async modifyPrice(ID: string, newPrice: number): Promise<{success: boolean, reason?: string}> {
        const query = 'UPDATE services SET price = $1 WHERE id = $2 RETURNING *'
        const res = await this.pool.query(query, [newPrice, ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true}
    }

    async modifyDurationMinutes(ID: string, NewDurationMinutes: number): Promise<{success: boolean, reason?: string}> {
        const query = 'UPDATE services SET durationminutes = $1 WHERE id = $2 RETURNING *'
        const res = await this.pool.query(query, [NewDurationMinutes, ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true}
    }
}
