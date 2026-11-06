import type { EmployeeRole } from "../enums/enums.js";
import { EmployeeRepo } from "../repositories/employeeRepo.js";
import { Employee } from "../models/Employee.js";

export class EmployeeService {

    private employeeService : EmployeeRepo

    constructor(employeeService: EmployeeRepo) {
        this.employeeService = employeeService
    }
    
    async getAll(): Promise<{result : Employee[]}> {
        return {result: await this.employeeService.Employee}
    }

    async add(name: string, phone: string, instagram: string, role: EmployeeRole): Promise<{result: Employee}> {
        return await this.employeeService.add(name, phone, instagram, role)
    }

    async delete(ID: string): Promise<{success: boolean, reason?: string}> {
        return await this.employeeService.delete(ID)
    }

    async modifyName(ID: string, newName: string): Promise<{success: boolean, reason?: string}> {
        return await this.employeeService.modifyName(ID, newName)
    }

    async modifyPhone(ID: string, newPhone: string): Promise<{success: boolean, reason?: string}> {
        return await this.employeeService.modifyPhone(ID, newPhone)
    }

    async modifyInstagram(ID: string, newInstagram: string): Promise<{success: boolean, reason?: string}> {
        return await this.employeeService.modifyInstagram(ID, newInstagram)
    }

    async modifyRole(ID: string, newRole: EmployeeRole): Promise<{success: boolean, reason?: string}> {
        return await this.employeeService.modifyRole(ID, newRole)
    }
}
