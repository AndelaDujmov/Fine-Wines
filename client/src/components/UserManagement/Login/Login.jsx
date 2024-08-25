import axios from "axios";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();

        const newErrors = {};
       
        if (!data.username.trim()) newErrors.username = "Username is required";
        if (!data.password.trim()) newErrors.password = "Password is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const { username, password } = data;

        try{
            const response = await axios.post('/auth/login', {
                username, password
            });

            const responseData = response.data;
            
            if (responseData.error){
                toast.error(responseData.error);
                return;
            }

            navigate('/');
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <form className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-500 text-center mb-6">Login</h2>

        <div className="space-y-2">
            <input
                type="text"
                name="username"
                placeholder="Username"
                className={`w-full p-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                value={data.username}
                onChange={(e) => setData({...data, username: e.target.value})}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          
            <input
                type="password"
                name="password"
                placeholder="Password"
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button
                type="submit"
                onClick={handleSubmit}
                className={`w-full mt-6 p-3 rounded-md transition ${
                    "bg-indigo-600 text-white hover:bg-indigo-700" 
                }`}
               
            >
                Login
            </button>
    </form>
    );
}

export default Login;