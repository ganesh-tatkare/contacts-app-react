import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from "react-router-dom";

export default function EditContact(props) {

    let history = useHistory();

    function handleClick() {
        history.push("/EditContact", props.item);
    }

    return (
        <div>
            <EditIcon onClick={handleClick}  />
        </div>
    )
}
