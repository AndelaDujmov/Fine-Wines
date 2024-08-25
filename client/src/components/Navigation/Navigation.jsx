import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../UserManagement/Login/Logout";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { UserContext } from "../../../context/userContext";

const Navigation = () => {
    const [isLogoutVisible, setLogoutVisible] = useState(false);
    const  { user } = useContext(UserContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setLogoutVisible(true);
    };

    useEffect(() => {
        if (user && Object.keys(user).length !== 0)
            setIsAuthenticated(true);
        else
            setIsAuthenticated(false);
        console.log(isAuthenticated);
    }, [user])

    const handleLogoutConfirm = async () => {
        try{
            const { data } = await axios.post('/auth/logout');
            toast.success(data.message);
        } catch(err) {
            toast.error('Network error');
        }
        navigate('/login');
        setLogoutVisible(false);
    };

    const handleLogoutCancel = () => {
        setLogoutVisible(false);
    };
    return (
    <nav>
        {
            isAuthenticated && (
               <>
                    <Link to='/'>Home</Link>
                    <Link to='/manufacturers'>Manufacturers</Link>
                    <Link to='/'>Wishlist</Link>
                    <Link to='/'>Cart</Link>
                    <button onClick={handleLogoutClick}>Logout</button>

               </>
            )
        }
        {
            isAdmin && (
                <Link to='/'>User Management</Link>
            )
        }
        {
            !isAuthenticated && (
                <>
                    <Link to='/'>Home</Link>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </>
            )
        }
       
       
        {isLogoutVisible && (
            <Logout
                onClose={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
            />
        )}
    </nav>
    );
}

export default Navigation;