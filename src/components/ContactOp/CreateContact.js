import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import EmailIcon from '@material-ui/icons/Email';
import './CreateContact.css';
import Box from '@material-ui/core/Box';
import PhoneIcon from '@material-ui/icons/Phone';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import { useSelector, useDispatch } from 'react-redux';
// import createContact from '../store/index';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    textFieldBelow: {
        marginTop: '10px'
    },
}));


const validationSchema = yup.object({
    firstName: yup
        .string('Enter first name')
        .required('First name required'),
    lastName: yup
        .string('Enter last name')
        .required('Last name required'),
    company: yup
        .string('Enter company name')
        .required('Company required'),
    jobTitle: yup
        .string('Enter job title')
        .required('Job title required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    phone: yup
        .string('Enter phone')
        .min(10, 'Phone must be 10 digits')
        .max(10, 'Phone must be 10 digits')
        .required('Phone required'),

});

export default function CreateContact(props) {
    const classes = useStyles();
    const [alert, setAlert] = useState(false);
    // const contactList = useSelector((state) => state.contacts);
    // const dispatch = useDispatch();

    let initialValues = {
        firstName: '',
        lastName: '',
        company: '',
        jobTitle: '',
        email: '',
        phone: '',
        id: '',
    };

    let history = useHistory();
    const value = history.location.state;
    console.log("History", value);
    console.log("Path",history.location.pathname)
    if (history.location.pathname === "/EditContact") {
        initialValues = value;
    }

    console.log("initial values",initialValues); 

    const formik = useFormik({
        enableReinitialize:true, //for emptying the form on changing path
        initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            // dispatch({ type: 'createContact', values });
            props.contactHandler(values);
            setAlert(true);
            //resetForm({ values: '' });
        }
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    };


    return (
        <Paper elevation={3} style={{ padding: '30px' }} >
            <form onSubmit={formik.handleSubmit} className={`${classes.root} form`} noValidate autoComplete="off">
                <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose} >
                    <Alert onClose={handleClose} variant='filled' severity="success">
                        Saved
                    </Alert>
                </Snackbar>
                <FormControl fullWidth>
                    <div className={classes.margin}>
                        <Grid container spacing={1} >
                            <Grid item xs={1}>
                                <Box mt={2}>
                                    <AccountCircle />
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id="input-with-icon-grid"
                                    label="First name"
                                    name='firstName'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                    fullWidth
                                />

                                <TextField
                                    className={classes.textFieldBelow}
                                    id="input-with-icon-grid"
                                    label="Last name"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </div>
                </FormControl>
                <FormControl fullWidth>
                    <div className={classes.margin}>
                        <Grid container spacing={1} >
                            <Grid item xs={1}>
                                <Box mt={2}>
                                    <HomeWorkIcon />
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id="input-with-icon-grid"
                                    label="Company"
                                    name="company"
                                    value={formik.values.company}
                                    onChange={formik.handleChange}
                                    error={formik.touched.company && Boolean(formik.errors.company)}
                                    helperText={formik.touched.company && formik.errors.company}
                                    fullWidth />

                                <TextField
                                    className={classes.textFieldBelow}
                                    id="input-with-icon-grid"
                                    label="Job title"
                                    name="jobTitle"
                                    value={formik.values.jobTitle}
                                    onChange={formik.handleChange}
                                    error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                                    helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                                    fullWidth />
                            </Grid>
                        </Grid>
                    </div>
                </FormControl>
                <FormControl fullWidth>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end" >
                            <Grid item xs={1}>
                                <Box mt={2}>
                                    <EmailIcon />
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id="input-with-icon-grid"
                                    label="Email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    fullWidth />
                            </Grid>
                        </Grid>
                    </div>
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <div className={classes.margin}>
                        <Grid container spacing={1} >
                            <Grid item xs={1}>
                                <Box mt={2}>
                                    <PhoneIcon />
                                </Box>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    id="input-with-icon-grid"
                                    label="Phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                    fullWidth />
                            </Grid>
                        </Grid>
                    </div>
                </FormControl>
                <div className={classes.margin} >
                    <Button type="submit" variant="contained">Save</Button>
                </div>
            </form>
        </Paper>
    );
}

