import { config } from "./config";
import * as Contacts from "./Contacts";
import * as IMAP from "./IMAP"
import * as SMTP from "./SMTP"

export function createState(inParentCompontent){
    return {
        pleaseWaitVisible: false,
        contacts: [],
        mailboxes: [],
        messages: [],
        currentView: "welcome",
        currentMailbox: null,
        messageID: null,
        messageDate: null,
        messageFrom: null,
        messageTo: null,
        messageSubject: null,
        messageBody: null,
        contactID: null,
        contactName: null,
        contactEmail: null,

        showHidePleaseWait : function(inVisible) {
            this.setState({ pleaseWaitVisible : inVisible});
        }.bind(inParentCompontent),

        addMailboxToList : function(inMailbox) {
            const cl = this.state.mailboxes.slice(0);
            cl.push(inMailbox);
            this.setState({mailboxes:cl});
        }.bind(inParentCompontent),

        addContactToList : function(inContact){
            const cl = this.state.contacts.slice(0);
            cl.push({_id:inContact._id,
                name : inContact.name, email: inContact.email
            })
            this.setState({contacts : cl});
        }.bind(inParentCompontent),

        getUser : function(){
            return config.userEmail;
        },

        showComposeMessage : function(inType) {
            switch(inType){
                case "new": 
                this.setState({ currentView : "compose", 
                    messageTo: "", messageSubject : "", messageBody : "",
                    messageFrom: config.userEmail
                })
                break;
                case "reply": 
                this.setState({ currentView : "compose",
                    messageTo: this.state.messageFrom, messageSubject : `Re: ${this.state.messageSubject}`, 
                    messageBody : `n/n---- Oririginal Message ---- /n/n${this.state.messageBody}`,
                    messageFrom: config.userEmail,
                })
                break;
                case "contact":
                this.setState({ currentView: "compose", 
                    messageTo: this.state.contactEmail, messageSubject : "", messageBody : "",
                    messageFrom: config.userEmail
                })
                break;
            }
        }.bind(inParentCompontent),

        setCurrentMailbox : function(inPath){
            this.setState({ currentView : "welcome",
                currentMailbox: inPath
            })
            this.state.getMessages(inPath);
        }.bind(inParentCompontent),

        getMessages : async function(inPath){
            this.state.showHidePleaseWait(true);
            const imapWorker = new IMAP.Worker();
            const messages = await imapWorker.listMessages(inPath);
            this.state.showHidePleaseWait(false);
            this.state.clearMessages();
            messages.forEach((inMessage)=>{
                this.state.addMessageToList(inMessage);
            })
        }.bind(inParentCompontent),

        clearMessages : function() {
            this.setState({ messages: []})
        }.bind(inParentCompontent),

        addMessageToList : function(inMessage){
            const cl = this.state.messages.slice(0);
            cl.push({id: inMessage.id, date: inMessage.date, 
                from: inMessage.from, subject: inMessage.subject
            });
            this.setState({messages: cl})
        }.bind(inParentCompontent),
        
        fieldChangeHandler : function(inEvent) {
            if(inEvent.target.id === "contactName" && 
                inEvent.target.value.length > 16)
                {return;}

            this.setState({ [inEvent.target.id]: inEvent.target.value})
        }.bind(inParentCompontent),

        saveContact : async function(){
            const cl = this.state.contacts.slice(0);
            this.state.showHidePleaseWait(true);
            const contactsWorker = new Contacts.Worker();
            const contact = await contactsWorker.addContact({
                name: this.state.contactName,
                email: this.state.contactEmail
            });
            this.state.showHidePleaseWait(false);
            cl.push(contact);
            this.setState({contacts : cl, contactID : null,
                contactName: "", contactEmail: ""
            })
        }.bind(inParentCompontent),

        deleteContact : async function(){
            this.state.showHidePleaseWait(true);
            const contactsWorker= new Contacts.Worker();
            await contactsWorker.deleteContact(this.state.contactID);
            this.state.showHidePleaseWait(false);
            const cl = this.state.contacts.filter(
                (inElement) => inElement._id != this.state.contactID
            )
            this.setState({contacts: cl, contactID : null,
                contactName: "", contactEmail: ""
            })
        }.bind(inParentCompontent),

        showMessage : async function(inMessage){
            this.state.showHidePleaseWait(true);
            const imapWorker = new IMAP.Worker();
            const mb  = await imapWorker.getMessageBody(
                inMessage.id, this.state.currentMailbox
            );
            this.state.showHidePleaseWait(false);
            this.setState({
                currentView: "message",
                messageID: inMessage.id, 
                messageDate: inMessage.date,
                messageFrom: inMessage.from,
                messageTo: "",
                messageSubject: inMessage.subject,
                messageBody: mb
            })
        }.bind(inParentCompontent),

        sendMessage : async function() {
            this.state.showHidePleaseWait(true);
            const smptpWorker = new SMTP.Worker();
            await smptpWorker.sendMessage(this.state.messageTo,
                this.state.messageFrom, this.state.messageSubject,
                this.state.messageBody    
            )
            this.state.showHidePleaseWait(false);
            this.setState({ currentView : "welcome"})
        }.bind(inParentCompontent),

        deleteMessage : async function(){
            this.state.showHidePleaseWait(true);
            const imapWorker  = new IMAP.Worker();
            await imapWorker.deleteMessage(
                this.state.messageID, this.state.currentMailbox
            );
            this.state.showHidePleaseWait(false);
            const cl = this.state.messages.filter(
                (inElement) => inElement.id != this.state.messageID
            )
            this.setState({
                messages: cl, currentView: "welcome"
            })
        }.bind(inParentCompontent)
    }
}
