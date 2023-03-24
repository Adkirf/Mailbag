import axios, { AxiosResponse } from "axios";
import { config } from "./config";


export class Worker{
     async listMailboxes(){
        try{
            const response = 
            await axios.get(`${config.serverAddress}/mailboxes`);
            return response.data;
        }catch(e){
            return e;
        }
        
    } 

     async listMessages(inMailbox){
        try{
            const response = 
                await axios.get(`${config.serverAddress}/mailboxes/${inMailbox}`)           
            return response.data;
        }catch(e){
            console.log(e);
        }
    }

     async getMessageBody(inID, inMailbox){
        const response = 
            await axios.get(`${config.serverAddress}/messages/${inMailbox}/${inID}}`)

        return response.data;
    }

     async deleteMessage(inID, inMailbox){
        await axios.delete(
            `${config.serverAddress}/messages/${inMailbox}/${inID}`
        )
    }
}