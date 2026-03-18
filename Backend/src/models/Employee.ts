import { EmployeeRole } from "../enums/enums.js";
import { v4 as uuidv4 } from "uuid"

export class Employee {
    private id : string
    private name : string
    private phone : string
    private instagram : string
    private role : EmployeeRole

    constructor(name: string, phone: string, instagram: string, role: EmployeeRole) {
        this.id = uuidv4()
        this.name = name
        this.phone = phone
        this.instagram = instagram
        this.role = role
    }

    get ID() {return this.id}
    get Name() {return this.name}
    get Phone() {return this.phone}
    get Instagram() {return this.instagram}
    get Role() {return this.role}

}