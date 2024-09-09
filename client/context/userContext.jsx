import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({});

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('/auth/user', {
                withCredentials: true 
            });

            setUser(response.data.user);
            
        } catch (error) {
            setUser(null);
        } 
    };

    useEffect(() => {
        fetchCurrentUser()
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, fetchCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}
