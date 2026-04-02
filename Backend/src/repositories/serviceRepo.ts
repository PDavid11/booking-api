import { Service } from "../models/Service.js";

export class ServiceRepo {

    private service : Service[]

    constructor( service: Service[] = [] ) {
        this.service = service
    }

    get Service() { return this.service}

    getByID(ID: string): {success: boolean, reason?: string, result?: Service} {
        let result = this.service.find(r => r.ID === ID)
        if (!result) {
            return {success: false, reason: "Not found"}          
        } else {
            return {success: true, result: result}
        }
    }

    add(name: string, durationMinutes: number, price: number): {result: Service} {
        let NewService = new Service(name, durationMinutes, price)
        this.service.push(NewService)
        return {result: NewService}
    }
    
    delete(ID: string): {success: boolean, reason?: string} {
        let index = this.service.findIndex(i => i.ID === ID)
        if (index === -1) {
            return { success: false, reason: "Not found"}
        } else {
            this.service.splice(index, 1)
            return { success: true }
        }
    }

    modifyName(ID: string, newName: string): {success: boolean, reason?: string} {
        let result = this.service.find(r => r.ID === ID)
        if (!result) {
            return {success: false, reason: "Not found"}
        } else {
            for (let i of this.service) {
                if (i.ID === ID) {
                    i.Name = newName
                }
            }
            return {success: true}
        }
    }

    modifyPrice(ID: string, newPrice: number): {success: boolean, reason?: string} {
        let result = this.service.find(r => r.ID === ID)
        if (!result) {
            return {success: false, reason: "Not found"}
        } else {
            for (let i of this.service) {
                if (i.ID === ID) {
                    i.Price = newPrice
                }
            }
            return {success: true}
        }
    }

    modifyDurationMinutes(ID: string, NewDurationMinutes: number): {success: boolean, reason?: string} {
        let result = this.service.find(r => r.ID === ID)
        if (!result) {
            return {success: false, reason: "Not found"}
        } else {
            for (let i of this.service) {
                if (i.ID === ID) {
                    i.DurationMinutes = NewDurationMinutes
                }
            }
            return {success: true}
        }
    }


}