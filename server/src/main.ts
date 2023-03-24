import path from "path";
import express, {Express, NextFunction, Request, Response} from "express";
import { serverInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP"
import * as Contacts from "./Contacts"
import { IContact } from "./Contacts"
const dotenv = require('dotenv');
dotenv.config();



const app: Express = express();

app.use(express.json());
app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
    
});
app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction){
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods",
    "GET,POST,DELETE,OPTIONS"
    );
    inResponse.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
    );
    inNext();
})

app.use("/",  
    express.static(path.join(__dirname, "../../client/dist"))

)

app.get("/mailboxes",
async (inRequest: Request, inResponse: Response)=>{
    try{
        console.log("get mailxboxes");
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
        inResponse.status(200).json(mailboxes);
    }catch(inError){
        
        inResponse.send(inError);
    }
}
)

app.get("/mailboxes/:mailbox",
async (inRequest: Request, inResponse: Response)=>{
    try{
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        const message: IMAP.IMessage[] = await imapWorker.listMessages({
            mailbox: inRequest.params.mailbox
        });
        inResponse.status(200).json(message);
        
    }catch(inError){
        inResponse.send(`error: ${inError}`);
    }
}
)

app.get("/messages/:mailbox/:id",
async (inRequest: Request, inResponse: Response)=>{
    try{
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        const messageBody: string = await imapWorker.getMessageBody({
            mailbox: inRequest.params.mailbox,
            id: parseInt(inRequest.params.id, 10)
        });
        inResponse.status(200).json(messageBody);
        
    }catch(inError){
        inResponse.send("error");
    }
}
)

app.delete("/messages/:mailbox/:id",
async (inRequest: Request, inResponse: Response)=>{
    try{
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        await imapWorker.deleteMessage({
            mailbox: inRequest.params.mailbox,
            id: parseInt(inRequest.params.id, 10)
        });
        inResponse.status(200).json("ok");
        
    }catch(inError){
        inResponse.send(`error: ${inError}`);
    }
}
)

app.post("/messages",
async (inRequest: Request, inResponse: Response)=>{
    try{
        const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
        await smtpWorker.sendMessage(inRequest.body);
        inResponse.status(200).json("ok");
        
    }catch(inError){
        inResponse.send("error");
    }
}
)

app.get("/contacts",
async (inRequest: Request, inResponse: Response)=>{
    try{
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        const contacts: IContact[] = await contactsWorker.listContacts();
        inResponse.status(200).json(contacts);
        
    }catch(inError){
        inResponse.send("error");
    }
}
)

app.post("/contacts",
async (inRequest: Request, inResponse: Response)=>{
    try{
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        const contact: IContact = await contactsWorker.addContact(inRequest.body);
        inResponse.status(200).json(contact);
        
    }catch(inError){
        inResponse.send("error");
    }
}
)

app.delete("/contacts/:id",
async (inRequest: Request, inResponse: Response)=>{
    try{
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        await contactsWorker.deleteContact(inRequest.params.id);
        inResponse.status(200).json("ok");
        
    }catch(inError){
        inResponse.send("error");
    }
}
) 
app.use("/", (req, res) => {
    res.send('welcome to the server')
})