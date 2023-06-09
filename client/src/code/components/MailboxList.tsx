import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';

export default function MailboxList({state}) {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {state.mailboxes?.map((mailbox, index)=>(
            <ListItem disablePadding key={index}>
            <ListItemButton onClick={() => {state.setCurrentMailbox(mailbox.path)}}>
              <ListItemIcon >
                <InboxIcon />
                <ListItemText primary={mailbox.name} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  )
}


