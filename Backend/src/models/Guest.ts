import {v4 as uuidv4} from "uuid"
import { Gender } from "../enums/enums.js";

export class Guest {

    private id : string
    private name : string
    private phone : string
    private gender : Gender

    constructor(name: string, phone: string, gender: Gender) {
        this.id = uuidv4()
        this.name = name
        this.phone = phone
        this.gender = gender
    }

    get ID() {return this.id}
    get Name() {return this.name}
    get Phone() {return this.phone}
    get Gender() {return this.gender}

}