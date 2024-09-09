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
            <p>{ user.password }</p>ž
            <input type="password" value={}/>
            <p>USER</p>
        </form>
    )
}

export default UserDetails;