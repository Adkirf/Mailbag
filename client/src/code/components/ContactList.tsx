import react from "react";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import { IoMdContact } from "react-icons/io";
import React from "react";

export default function ContactList({state}) {
    return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {state.contacts.map((contact, index)=>(
      <ListItemButton onClick={()=>state.showContact(contact._id, contact.name, contact.email)}>
        <ListItemAvatar>
          <Avatar>
            <IoMdContact size={40}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={contact.name}/>
      </ListItemButton>
      ))}
    </List>
    )
}