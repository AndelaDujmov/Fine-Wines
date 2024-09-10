import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../HomePage/BackButton/BackButton';
import { useState } from 'react';
import axios from 'axios';
import Spinner from '../../../HomePage/Spinner/Spinner';
import toast from 'react-hot-toast';

const Delete = () => {
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/";
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const handleDelete = async() => {   
        try {
            const wineDeleteResponse = await axios.delete(API_URL + `wines/delete/${id}`);
            const wineData = wineDeleteResponse.data;
            console.log(wineData);
            setLoading(true);
            toast.success('Successfully deleted!');
            navigate('/wines');
            
        } catch (error) {
            alert("Error fetching data");
            setLoading(false);
        }
    }

    return (
    <>
        <BackButton destination='/wines' />
        <div className="text-3xl my-4">Delete?</div>
      
            <div className="flex flex-col items-center border-2 border-gray-500 rounded-xl w-[600px] p-8 mx-auto">
                <h3 className="text-2xl font-semibold">Are you sure you want to delete?</h3>
                <button className='p-4 bg-red-600 text-white w-full' onClick={handleDelete}>Yes</button>
                {loading ? ( <Spinner /> ) : ''}
            </div>
        
        
    </>)
}

export default Delete;