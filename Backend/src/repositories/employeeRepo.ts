import { Pool } from "pg";
import type { EmployeeRole } from "../enums/enums.js";
import { Employee } from "../models/Employee.js";

export class EmployeeRepo {

    constructor(private pool : Pool) {}

    private toEmployee(row: any): Employee {
        return new Employee(row.name, row.phone, row.instagram, row.role, row.id)
    }

    get Employee(): Promise<Employee[]> {
        return this.getAll()
    }

    async getAll(): Promise<Employee[]> {
        const query = 'SELECT * FROM employees'
        const res = await this.pool.query(query)
        return res.rows.map(row => this.toEmployee(row))
    }

    async getByID(ID: string): Promise<{success: boolean, reason?: string, result?: Employee}> {
        const query = 'SELECT * FROM employees WHERE id = $1'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true, result: this.toEmployee(res.rows[0])}
    }

    async getByRole(role: EmployeeRole): Promise<{success: boolean, reason?: string, result?: Employee[]}> {
        const query = 'SELECT * FROM employees WHERE role = $1'
        const res = await this.pool.query(query, [role])

        if (res.rows.length < 1) {
            return {success: false, reason: "Not found"}
        }

        return {success: true, result: res.rows.map(row => this.toEmployee(row))}
    }

    async add(name: string, phone: string, instagram: string, role: EmployeeRole): Promise<{result: Employee}> {
        const newEmployee = new Employee(name, phone, instagram, role)
        const query = 'INSERT INTO employees (id, name, phone, instagram, role) VALUES ($1, $2, $3, $4, $5)'
        await this.pool.query(query, [newEmployee.ID, newEmployee.Name, newEmployee.Phone, newEmployee.Instagram, newEmployee.Role])

        return {result : newEmployee}
    }

    async delete(ID: string): Promise<{success: boolean, reason?: string}> {
        const query = 'DELETE FROM employees WHERE id = $1 RETURNING *'
        const res = await this.pool.query(query, [ID])

        if (res.rows.length === 0) {
            return { success: false, reason: "Not found"}
        }

        return { success: true }
    }

    async modifyName(ID: string, newName: string): Promise<{success: boolean, reason?: string}> {
        const query = 'UPDATE employees SET name = $1 WHERE id = $2 RETURNING *'
        const res = await this.pool.query(query, [newName, ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true}
    }

    async modifyPhone(ID: string, newPhone: string): Promise<{success: boolean, reason?: string}> {
        const query = 'UPDATE employees SET phone = $1 WHERE id = $2 RETURNING *'
        const res = await this.pool.query(query, [newPhone, ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true}
    }

    async modifyInstagram(ID: string, newInstagram: string): Promise<{success: boolean, reason?: string}> {
        const query = 'UPDATE employees SET instagram = $1 WHERE id = $2 RETURNING *'
        const res = await this.pool.query(query, [newInstagram, ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true}
    }

    async modifyRole(ID: string, newRole: EmployeeRole): Promise<{success: boolean, reason?: string}> {
        const query = 'UPDATE employees SET role = $1 WHERE id = $2 RETURNING *'
        const res = await this.pool.query(query, [newRole, ID])

        if (res.rows.length === 0) {
            return {success: false, reason: "Not found"}
        }

        return {success: true}
    }
}
