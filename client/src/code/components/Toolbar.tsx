import Button from '@mui/material/Button';
import { AiFillAccountBook, AiFillAlert } from "react-icons/ai";
import React from 'react'

export default function Toolbar({state}) {
  
  return (
    <div>
        <Button variant="contained" color="primary"
        size="small" style={{marginRight:10}}
        onClick={()=> state.showComposeMessage("new")}
        >
            <AiFillAccountBook style={{marginRight:10}}> New Message</AiFillAccountBook>
        </Button>
        <Button variant="contained" color="primary" size="small"
        style={{marginRight:10}} onClick={state.showAddContact}
        >
            <AiFillAlert style={{marginRight:10}}> New Contact</AiFillAlert>
        </Button>
        <Button>

          <p>{state.getUser()}</p>
        </Button>
        
    </div>
  )
}
