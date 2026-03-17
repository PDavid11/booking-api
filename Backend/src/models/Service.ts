import { v4 as uuid } from "uuid"

export class Service {
    private ID : string
    private name : string
    private durationMinutes : number
    private price : number

    constructor(name: string, durationMinutes: number, price: number) {
        this.ID = uuid()
        this.name = name
        this.durationMinutes = durationMinutes
        this.price = price
    }

    getID() {return this.ID}
    getName() {return this.name}
    getDurationMinutes() {return this.durationMinutes}
    getPrice() {return this.price}
}