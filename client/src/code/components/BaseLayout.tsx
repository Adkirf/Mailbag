import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import React from 'react'
import { createState } from '../state';
import Toolbar from './Toolbar';
import MessageList from './MessageList';
import WelcomeView from './WelcomeView';
import ContactView from './ContactView';
import MessageView from './MessageView';
import MailboxList from './MailboxList';
import ContactList from "./ContactList";

class BaseLayout extends React.Component {
  state = createState(this);

  render(){
    return (
      <div className='appContainer'> 
        <Dialog open={this.state.pleaseWaitVisible}>
          <DialogTitle style={{textAlign:"center"}}>
            Please Wait
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              ...Contacting server...
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <div className="toolbar">
          <Toolbar state={this.state}/>
        </div>
        <div className="mailboxList">
          <MailboxList state={this.state}/>
        </div>
        <div className='text-white text-xl'>
          HELLO
        </div>
        <div className="centerArea">
          <div className="messageList">
            <MessageList state={this.state}/>
          </div>
          <div className="centerViews">
            {this.state.currentView==="welcome" && <WelcomeView/>}
            {(this.state.currentView==="message" || this.state.currentView==="compose") && <MessageView state={this.state}/>}
            {(this.state.currentView==="contact" || this.state.currentView==="contactAdd") && <ContactView state={this.state}/>}
          </div>
        </div>
        <div className="contactList">
          <ContactList state={this.state}/>
        </div>
      </div>
      )
  }
}

export default BaseLayout;
