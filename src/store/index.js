import { createStore } from 'redux';

const initialContacts = [
    {
        firstName: 'Ganesh',
        lastName: 'Tatkare',
        company: 'TCS',
        jobTitle: 'Dev',
        email: 'gtatkare@gmail.com',
        phone: '8655079637'
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        company: 'Something',
        jobTitle: 'Dev',
        email: 'jane.doe@gmail.com',
        phone: '9619334588'
    },
]

const formDataReducer = (state = {contacts: initialContacts}, action) => {

    if (action.type === 'createContact') {
        return {
            contacts: [...state.contacts, action.values]
        }
    };

    if (action.type === 'deleteContact') {
        console.log('deleted-',action.id);
        return {
            contacts: [...state.contacts.filter(contact => contact.phone !== action.id)]
        }
    };

    return state;
}

const store = createStore(formDataReducer);

export default store;