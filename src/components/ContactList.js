import { Typography } from '@material-ui/core';
import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import ContactTable from './ContactTable';
import { useState } from 'react';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';

const ContactList = (props) => {

    const [deleteAlert, setDeleteAlert] = useState(false);

    const deleteContact = (item) => {
        props.deleteHandler(item);
        setDeleteAlert(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setDeleteAlert(false);
    };

    // const contactList = useSelector((state) => state.contacts);

    return (
        <>
            <Snackbar open={deleteAlert} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} variant='filled' severity="error">
                    Contact Deleted
                </Alert>
            </Snackbar>
            {props.contactList.length === 0 && <Typography variant="h6">No Contacts Found</Typography>}
            {props.contactList.length > 0 && <ContactTable deleteHandler={deleteContact} contact={props.contactList} />}
        </>
    );
};

export default ContactList;
