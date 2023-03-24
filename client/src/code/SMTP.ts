import axios from "axios"
import {config} from "./config"

export class Worker {

     async sendMessage(
        inTo, inFrom, inSubject, inMessage
    ){
        await axios.post(`${config.serverAddress}/messages`, {
            to: inTo, from: inFrom, subject: inSubject, text: inMessage
        })
    }
}