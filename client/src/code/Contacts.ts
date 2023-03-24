import axios, { AxiosResponse } from "axios"
import { config } from "./config"


export class Worker {
     async listContacts(){
        const response = 
            await axios.get(`${config.serverAddress}/contacts`)
            console.log(response.data)
            return response.data;
    }

     async addContact(inContact){
        const response = await axios.post(
            `${config.serverAddress}/contacts`, inContact
        )
        return response.data;
    }

     async deleteContact(inID){
        await axios.delete(
            `${config.serverAddress}/contacts/$⁄{inID}`
            );
    }
}