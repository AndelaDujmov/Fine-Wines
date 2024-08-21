import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';

const Details = ({ wine, onClose }) => {
    const [manufacturer, setManufacturer] = useState({});
    const { id } = useParams();
    const API_URL = "http://localhost:3000/";

    useEffect(() => {
        const fetchManufacturer = async () => {
            try {
                const manufacturersResponse = await axios.get(API_URL + `manufacturers/${wine.manufacturer}`);
                const manufacturerData = manufacturersResponse.data.manufacturer;
    
                setManufacturer(manufacturerData); 
               
            } catch (error) {
                console.log("Error fetching data:", error);
                
            }
        };
    
        fetchManufacturer();
    }, [wine]);


    return (
        <div className="fixed bg-black bg-opacity-20 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
            onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()} className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative">
                <AiOutlineClose className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer" onClick={onClose} />
                
             
                <div className="flex flex-col border-2 border-gray-400 rounded-xl w-full p-4">
                <div className="my-4">
                        <span className="text-xl mr-4 text-gray-600">{wine.name} &euro;</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-600">{wine.price} &euro;</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-600">{wine.type}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-600">{manufacturer.name}</span>
                    </div>
                </div>
            </div>
        </div>
);
}

export default Details;