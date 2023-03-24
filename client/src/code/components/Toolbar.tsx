import Button from '@mui/material/Button';
import { AiFillAccountBook, AiFillAlert } from "react-icons/ai";
import React from 'react'

import { MdEmail, MdPermContactCalendar } from "react-icons/md";

export default function Toolbar({state}) {
  
  return (
    <div>
        <Button variant="contained" color="primary"
        size="small" style={{marginRight:10}}
        onClick={()=> state.showComposeMessage("new")}
        >
            <MdEmail style={{marginRight:10}} />
            Writte  
        </Button>
        <Button variant="contained" color="primary" size="small"
        style={{marginRight:10}} onClick={state.showAddContact}
        >
            <MdPermContactCalendar style={{marginRight:10}} />
            Add Contact
        </Button>
        <Button>

          <p>{state.getUser()}</p>
        </Button>
    </div>
  )
}
