import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../UserManagement/Login/Logout";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { UserContext } from "../../../context/userContext";

const Navigation = () => {
    const [isLogoutVisible, setLogoutVisible] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setLogoutVisible(true);
    };

    useEffect(() => {
        if (user && Object.keys(user).length !== 0) {
            setIsAuthenticated(true);
            setIsAdmin(user.isAdmin);
        } else {
            setIsAuthenticated(false);
            setUser({});
            setIsAdmin(false);
        }
    }, [user]);

    const handleLogoutConfirm = async () => {
        try {
            const { data } = await axios.post('/auth/logout', {}, { withCredentials: true });
            setUser({});
            toast.success(data.message);
        } catch (err) {
            toast.error('Network error');
        }
        navigate('/login');
        setLogoutVisible(false);
    };

    const handleLogoutCancel = () => {
        setLogoutVisible(false);
    };

    return (
        <nav className="bg-gray-800 text-white py-4 px-6 fixed top-0 left-0 w-full z-50 shadow-md mb-32">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex space-x-4">
                    {isAuthenticated ? (
                        <>
                            <p>Hello, {user.username}</p>
                            <Link to='/' className="hover:text-gray-400">Home</Link>
                            <Link to='/manufacturers' className="hover:text-gray-400">Manufacturers</Link>
                            <Link to='/cart' className="hover:text-gray-400">Cart</Link>
                            <Link to='/wishlist' className="hover:text-gray-400">Wishlist</Link>
                            {isAdmin && (
                                <Link to='/usermanagement' className="hover:text-gray-400">User Management</Link>
                            )}
                            <button
                                onClick={handleLogoutClick}
                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to='/' className="hover:text-gray-400">Home</Link>
                            <Link to='/login' className="hover:text-gray-400">Login</Link>
                            <Link to='/register' className="hover:text-gray-400">Register</Link>
                            
                        </>
                    )}
                </div>
            </div>
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
