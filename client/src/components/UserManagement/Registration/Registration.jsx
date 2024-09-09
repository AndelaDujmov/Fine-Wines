import { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleClick = (e) => {
        setTermsAccepted(e.target.checked);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
    
        const newErrors = {};
        if (!data.firstName.trim()) newErrors.firstName = "First name is required";
        if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!data.username.trim()) newErrors.username = "Username is required";
        if (!data.email.trim()) newErrors.email = "Email is required";
        if (!data.password.trim()) newErrors.password = "Password is required";
        if (!termsAccepted) newErrors.terms = "You must accept the terms";
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length > 0) {
            return;
        }
    
        const {firstName, lastName, username, email, password} = data;
    
        try{
            const response = await axios.post('http://localhost:3000/auth/register', {
                firstName, lastName, username, email, password
            });
    
            const responseData = response.data;
    
            if(responseData.error)
                toast.error(responseData.error);
            else{
                setData({});
                toast.success("Registration successful!");
                navigate('/login');
            }
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }
    }
    

    return (
        <form className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-600">Register</h2>

            <div className="space-y-2">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                    value={data.firstName}
                    onChange={handleChange}
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                    value={data.lastName}
                    onChange={handleChange}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className={`w-full p-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                    value={data.username}
                    onChange={handleChange}
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                    value={data.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                    value={data.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="flex items-center space-x-2 mt-4">
                <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                    onChange={handleClick}
                />
                <label htmlFor="terms" className="text-gray-700">
                    I accept the terms and I am older than 18.
                </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

            <button
                type="submit"
                className={`w-full mt-6 p-3 rounded-md transition ${
                    termsAccepted ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                disabled={!termsAccepted}
            >
                Register
            </button>
        </form>
    );
}

export default Registration;
