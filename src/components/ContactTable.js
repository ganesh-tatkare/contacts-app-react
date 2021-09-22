import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteContact from './DeleteContact';
import EditContact from './EditContact';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
    },
    thead: {
        backgroundColor: "#8793d2",
    },
    actions: {
        display: 'flex',
    }
});

export default function ContactTable(props) {

    const classes = useStyles();
    const rows = props.contact;

    const deleteHandler = (id) => {
        props.deleteHandler(id);
    }

    return (
        <>
            <Paper elevation={1} >
                <TableContainer>
                    <Table className={classes.table} aria-label="caption table">
                        <TableHead className={classes.thead}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.firstName}
                                    </TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell className={classes.actions}>
                                        <DeleteContact item={row.id} deleteItem={deleteHandler} />
                                        <EditContact item={row} />
                                        {/* <DeleteIcon onClick={deleteHandler} /> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}
