import React from "react";
import { useState, useEffect } from 'react';
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ContactList from './ContactList';
import CreateContact from './ContactOp/CreateContact';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import firebase from '../firebase';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    backgroundColor: '#262c4c',
    boxShadow: 'none',
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    position: "fixed",
    top: 64
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  links: {
    color: 'black',
    textDecoration: 'none',
  }
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [contacts, setContacts] = useState([]);

  const handleDrawer = () => {
    setOpen(!open);
  };

  //adding data to firestore and app
  const setContactHandler = (NewContact) => {
    const db = firebase.firestore();
    db.collection("contacts").add(NewContact);
  }


  //deleting data from firestore and app
  const deleteItem = (item) => {
    const db = firebase.firestore();
    db.collection("contacts").doc(item).delete();
  }

  //fetching data from firestore and adding id field which is document id for deletion
  useEffect(() => {
    console.log("in effect");
    const db = firebase.firestore();
    const unsubscribe = db.collection("contacts").onSnapshot((snapshot) => {
      const contData = [];
      console.log("snapshot", snapshot);
      snapshot.forEach(doc =>
        contData.push({ ...doc.data(), id: doc.id })
      );
      setContacts(contData);
    });

    return unsubscribe;
    // const data = await db.collection("contacts").get();
    // setContacts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  }, []);

  console.log("contactsList", contacts)

  const updateContact = (contact) => {
    const db = firebase.firestore();
    db.collection("contacts").doc(contact.id).update({
      firstName: contact.firstName,
      lastName: contact.lastName,
      company: contact.company,
      jobTitle: contact.jobTitle,
      email: contact.email,
      phone: contact.phone,
      id: contact.id,
    });
    console.log(contact);
  };


  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={clsx(classes.appBar)}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Contacts
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <List>
            {['Create Contact', 'Contacts'].map((text, index) => (
              <NavLink
                activeStyle={{
                  fontWeight: "bold",
                  color: "#8793d2"
                }}
                key={index}
                role="button"
                to={"/" + text}
                className={classes.links}
              >
                <ListItem button key={index} >
                  <ListItemIcon>{index % 2 === 0 ? <AddIcon /> : <PeopleIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            <Route path="/Contacts">
              <ContactList contactList={contacts} deleteHandler={deleteItem} />
            </Route>
            <Route path="/Create Contact">
              <CreateContact contactHandler={setContactHandler} />
            </Route>
            <Route path="/EditContact">
              <CreateContact contactHandler={updateContact} />
            </Route>
            <Route path="/">
              <ContactList contactList={contacts} deleteHandler={deleteItem} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router >
  );
}
