import React from 'react'
import ReactDOM from "react-dom"

import "./css/main.css"

import * as IMAP from "./code/IMAP"
import BaseLayout from './code/components/BaseLayout'

const baseComponent = ReactDOM.render(
    <BaseLayout />, document.body );

baseComponent.state.showHidePleaseWait(true);

async function getMailboxes() {
    const imapWorker = new IMAP.Worker();
    try{
        const mailboxes  = await imapWorker.listMailboxes();
        console.log(mailboxes)
        mailboxes.forEach(async (inMailbox)=>{
            baseComponent.state.addMailboxToList(inMailbox);
        })
    }catch(e){
        console.log("frontend: error");
        console.log(e);
    }
 
}

getMailboxes().then(()=>{
    baseComponent.state.showHidePleaseWait(false)
})
