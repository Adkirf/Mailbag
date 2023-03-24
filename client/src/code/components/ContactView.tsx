import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react'



export default function ContactView({state}) {
  return (

    <form>
          <TextField 
          id="contactName" 
          value={state.contactName || ""}
          placeholder={"Name"}
          onChange={state.fieldChangeHandler}
          />
          <br/>
      
          <TextField 
          id="contactEmail" 
          value={state.contactEmail ||""}
          placeholder={"Email"}
          disabled={state.currentView === "contact"}
          onChange={state.fieldChangeHandler}
          />
           <br/>

         {state.currentView === "contactAdd" &&
            <Button variant="contained" color="primary" size="small"
            style={{ marginTop: 10}}
            onClick={ state.saveContact}
            >
                Save
            </Button>
         }
         {state.currentView === "contact" &&
            <Button variant="contained" color="primary" size="small"
            style={{ marginTop: 10, marginRight:10}}
            onClick={ state.deleteContact}
            >
                Delete
            </Button>
         }
         {state.currentView === "contact" &&
            <Button variant="contained" color="primary" size="small"
            style={{ marginTop: 10}}
            onClick={()=> state.showComposeMessage("contact")}
            >
                Send Email
            </Button>
         }

    </form>

  )
}
