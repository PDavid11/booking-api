import type { EmployeeRole } from "../enums/enums.js";
import { Employee } from "../models/Employee.js";

export class EmployeeRepo {

    private employee : Employee[]

    constructor(employee : Employee[] = []) {
        this.employee = employee
    }

    get Employee() {return this.employee}

    getByID(ID: string): {success: boolean, reason?: string, result?: Employee} {
        let result = this.employee.find(r => r.ID === ID)
        if (!result) {
            return {success: false, reason: "Not found"}          
        } else {
            return {success: true, result: result}
        }
    }

    getByRole(role: EmployeeRole): {success: boolean, reason?: string, result?: Employee[]} {
        let result = this.employee.filter(r => r.Role === role)
        if (result.length < 1) {
            return {success: false, reason: "Not found"}
        } else {
            return {success: true, result: result}
        }
    }

    add(name: string, phone: string, instagram: string, role: EmployeeRole) {
        this.employee.push(new Employee(name, phone, instagram, role))
    }

    delete(ID: string): {success: boolean, reason?: string} {
        let index = this.employee.findIndex(i => i.ID === ID)
        if (index === -1) {
            return { success: false, reason: "Not found"}
        } else {
            this.employee.splice(index, 1)
            return { success: true }
        }
    }

    modifyName(ID: string, newName: string): {success: boolean, reason?: string} {
        let result = this.employee.find(r => r.ID === ID)
        if (!result) {
            return {success: false, reason: "Not found"}
        } else {
            for (let i of this.employee) {
                if (i.ID === ID) {
                    i.Name = newName
                }
            }
            return {success: true}
        }
    }

    modifyPhone(ID: string, newPhone: string): {success: boolean, reason?: string} {
        let result = this.employee.find(r => r.ID === ID)
        if (!result) {
            return {success: false, reason: "Not found"}
        } else {
            for (let i of this.employee) {
                if (i.ID === ID) {
                    i.Phone = newPhone
                }
            }
            return {success: true}
        }
    }

    modifyInstagram(ID: string, newInstagram: string): {success: boolean, reason?: string} {
        let result = this.employee.find(r => r.ID === ID)
        if (!result) {
            return {success: false, reason: "Not found"}
        } else {
            for (let i of this.employee) {
                if (i.ID === ID) {
                    i.Instagram = newInstagram
                }
            }
            return {success: true}
        }
    }

    modifyRole(ID: string, newRole: EmployeeRole): {success: boolean, reason?: string} {
        let result = this.employee.find(r => r.ID === ID)
        if (!result) {
            return {success: false, reason: "Not found"}
        } else {
            for (let i of this.employee) {
                if (i.ID === ID) {
                    i.Role = newRole
                }
            }
            return {success: true}
        }
    }
}