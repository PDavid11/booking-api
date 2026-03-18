import { v4 as uuid } from "uuid"

export class Service {
    private id : string
    private name : string
    private durationMinutes : number
    private price : number

    constructor(name: string, durationMinutes: number, price: number) {
        this.id = uuid()
        this.name = name
        this.durationMinutes = durationMinutes
        this.price = price
    }

    get ID() {return this.id}
    get Name() {return this.name}
    get DurationMinutes() {return this.durationMinutes}
    get Price() {return this.price}
}