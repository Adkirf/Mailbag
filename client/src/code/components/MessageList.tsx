import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react'

export default function MessageList({state}) {
    return (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell style={{width:120}}>
                    Date
                </TableCell>
                <TableCell style={{width:300}}>
                    From
                </TableCell>
                <TableCell>
                    Subject
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                state.messages.map(message=>(
                    <TableRow key={message.id}
                    hover
                    onClick={()=>{
                        state.showMessage(message)
                        console.log("hi")
                        }}>
                        <TableCell>
                            { new Date(message.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            {message.from}
                        </TableCell>
                        <TableCell>
                            {message.subject}
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
  )
}
