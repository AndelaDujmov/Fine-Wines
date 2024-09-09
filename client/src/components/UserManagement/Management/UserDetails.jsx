import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

const UserDetails = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios
        .get(`auth/user/${id}`, { withCredentials: true })
        .then(response => (
            setUser(response.data.user)
        ))
    }, []);

    return(
        <form>
            <p>{ user.firstName }</p>
            <p>{ user.lastName }</p>
            <p>{ user.username }</p>
            <p>{ user.password }</p>
            <p>USER</p>
        </form>
    )
}

export default UserDetails;