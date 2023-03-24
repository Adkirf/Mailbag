import React from 'react'

import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';


function MessageView({state}) {
  return (
    <form>
        {
            state.currentView === "message" && 
            <InputBase 
            defaultValue={`ID ${state.messageID}`}
            margin="dense"
            disabled={true}
            fullWidth={true}
            className="messageInfoField"
            />
        }
        {state.currentView === "message" && <br />}
        {
            state.currentVIew === "message" &&
            <InputBase 
                defaultValue={state.messageDate}
                margin="dense"
                disabled={true}
                fullWidth={true} 
                className="messageInfoField"
                />
        }
        {state.currentView === "message" && <br />}

        {
            state.currentView === "message" && 
            <TextField 
            margin="dense"
            variant="outlined"
            fullWidth={true}
            label="From"
            value={ state.messageFrom}
            disabled={true}
            InputProps={{style: {color: "#000000"}}}
            />
        }
        {state.currentView === "message" && <br />}
        {
            state.currentView === "compose" && 
            <TextField 
            id="messageTO"
            margin="dense"
            variant="outlined"
            value={state.messageTo}
            disabled={true}
            fullWidth={true}
            placeholder="To"
            onChange={state.fieldChangeHandler}
            />
        }
        {state.currentView === "compose" && <br />}

        {
            state.currentView === "compose" && 
            <TextField 
            id="messageSubject"
            margin="dense"
            variant="outlined"
            value={state.messageSubject}
            disabled={state.currentView==="message"}
            fullWidth={true}
            placeholder="Subject"
            onChange={state.fieldChangeHandler}
            />
        }
        {state.currentView === "compose" && <br />}
        <TextField 
            id="messageBody"
            margin="dense"
            variant="outlined"
            multiline={true}
            minRows={12}
            value={state.messageBody}
            disabled={state.currentView==="message"}
            fullWidth={true}
            onChange={state.fieldChangeHandler}
            />
        {
        state.currentView === "compose" &&
        <Button
        variant='contained'
        color="primary"
        size="small"
        style={{marginTop:10}}
        onClick={state.sendMessage}
        >
            Send
        </Button>
        }
        {
            state.currentView === "message" &&
            <Button
            variant='contained'
            color="primary"
            size="small"
            style={{marginTop: 10, marginRight: 10}}
            onClick={()=> state.showComposeMessage("reply")}
            >
                Reply
            </Button>
        }
        {
            state.currentView === "message" &&
            <Button
            variant='contained'
            color="primary"
            size="small"
            style={{marginTop: 10}}
            onClick={state.deleteMessage}
            >
                Delete
            </Button>
        }
    </form>
  )
}

export default MessageView