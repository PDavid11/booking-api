import { EmployeeRole } from "../enums/enums.js";
import { v4 as uuidv4 } from "uuid"

export class Employee {
    private ID : string
    private name : string
    private phone : string
    private instagram : string
    private role : EmployeeRole

    constructor(name: string, phone: string, instagram: string, role: EmployeeRole) {
        this.ID = uuidv4()
        this.name = name
        this.phone = phone
        this.instagram = instagram
        this.role = role
    }

    getID() {return this.ID}
    getName() {return this.name}
    getPhone() {return this.phone}
    getInstagram() {return this.instagram}
    getRole() {return this.role}

}