import React from 'react'
import ReactDOM from "react-dom"

import "./css/main.css"

import * as IMAP from "./code/IMAP"
import * as Contacts from "./code/Contacts"

import BaseLayout from './code/components/BaseLayout'

const baseComponent = ReactDOM.render(
    <BaseLayout />, document.body );

baseComponent.state.showHidePleaseWait(true);

async function getMailboxes() {
    const imapWorker = new IMAP.Worker();
    const contactWorker = new Contacts.Worker();
    try{
        const mailboxes  = await imapWorker.listMailboxes();
        mailboxes.forEach(async (inMailbox)=>{
            baseComponent.state.addMailboxToList(inMailbox);
        })
        const contacts = await contactWorker.listContacts();
        contacts.forEach(async (inContact)=>{
            baseComponent.state.addContactToList(inContact);
        })
    }catch(e){
        console.log("frontend: error");
        console.log(e);
    }
 
}

getMailboxes().then(()=>{
    baseComponent.state.showHidePleaseWait(false)
})
