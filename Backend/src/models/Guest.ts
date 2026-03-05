import {v4 as uuidv4} from "uuid"
import { Gender } from "../enums/enums.js";

export class Guest {

    private ID : string
    private name : string
    private phone : string
    private gender : Gender

    constructor(name: string, phone: string, gender: Gender) {
        this.ID = uuidv4()
        this.name = name
        this.phone = phone
        this.gender = gender
    }

    getID() {return this.ID}
    getName() {return this.name}
    getPhone() {return this.phone}
    getGender() {return this.gender}

}