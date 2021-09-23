import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
// import { useSelector, useDispatch } from 'react-redux';

export default function DeleteContact(props) {

    // const dispatch = useDispatch();
    

    const deleteContact = () => {
        const id = props.item;
        // dispatch({ type: 'deleteContact', id });
        props.deleteItem(id);
    }



    return (
        <div>
            <DeleteIcon onClick={deleteContact} />
        </div>
    )
}
