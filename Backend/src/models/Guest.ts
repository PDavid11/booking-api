import {v4 as uuidv4} from "uuid"

export class Guest {

    private id : string
    private name : string
    private phone : string

    constructor(name: string, phone: string, id?: string) {
        this.id = id || uuidv4()
        this.name = name
        this.phone = phone
    }

    get ID() {return this.id}
    get Name() {return this.name}
    get Phone() {return this.phone}

}