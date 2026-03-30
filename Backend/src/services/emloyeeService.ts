import type { EmployeeRole } from "../enums/enums.js";
import { EmployeeRepo } from "../repositories/employeeRepo.js";

export class EmployeeService {

    private employeeService : EmployeeRepo

    constructor(employeeService: EmployeeRepo) {
        this.employeeService = employeeService
    }

    add(name: string, phone: string, instagram: string, role: EmployeeRole) {
        this.employeeService.add(name, phone, instagram, role)
    }

    delete(ID: string):{success: boolean, reason?: string} {
        return this.employeeService.delete(ID)
    }

    modifyName(ID: string, newName: string): {success: boolean, reason?: string} {
        return this.employeeService.modifyName(ID, newName)
    }

    modifyPhone(ID: string, newPhone: string): {success: boolean, reason?: string} {
        return this.employeeService.modifyPhone(ID, newPhone)
    }

    modifyInstagram(ID: string, newInstagram: string): {success: boolean, reason?: string} {
        return this.employeeService.modifyInstagram(ID, newInstagram)
    }

    modifyRole(ID: string, newRole: EmployeeRole): {success: boolean, reason?: string} {
        return this.employeeService.modifyRole(ID, newRole)
    }
}