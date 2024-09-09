import React, { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

import toast from "react-hot-toast";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`auth/users`, { withCredentials: true })
            .then(response => {
                setUsers(response.data.users);
              
            })
            .catch(error => {
                toast("Error fetching data: ", error);
            });
    }, []);


    return (
        <div className="p-4">
        <h1 className="text-5xl font-extrabold text-center mb-4">Users</h1>
    
        <div className="flex flex-col items-center">
            { (
                <div className="overflow-x-auto w-full max-w-4xl">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Username
                                </th>
                                <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Password
                                </th>
                                <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} className="border-b">
                                        <td className="py-2 px-4 text-black">{user.username}</td>
                                        <td className="py-2 px-4 text-black">{user.password}</td>
                                        <td className="py-2 px-4 text-black">USER</td>
                                        <td className="py-2 px-4 flex space-x-4 items-center justify-center">
                                            <Link to={`/user/${user._id}`}><AiOutlineEdit className="text-2xl text-yellow-600" /></Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="py-2 px-4 text-center text-gray-500">
                                        No users available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
    
    );
}

export default Users;