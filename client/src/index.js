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
        mailboxes.forEach(async (inMailbox)=>{
            const base = await baseComponent;
            base.state.addMailboxToList(inMailbox);
        })
    }catch(e){
        console.log("frontend: error");
        console.log(e);
    }
 
}

getMailboxes().then(()=>{
    baseComponent.state.showHidePleaseWait(false)
})
