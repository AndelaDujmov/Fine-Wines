import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from "../../../HomePage/BackButton/BackButton";

const DetailsManufacturer = ({ wine, onClose }) => {
    const [manufacturer, setManufacturer] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchManufacturer = async () => {
            try {
                const manufacturersResponse = await axios.get(`manufacturers/${id}`, { withCredentials: true });
                const manufacturerData = manufacturersResponse.data.manufacturer;
    
                setManufacturer(manufacturerData); 
               
            } catch (error) {
                console.log("Error fetching data:", error); 
            }
        };
    
        fetchManufacturer();
    }, [manufacturer]);

    return (
        <div className="container mx-auto p-6 justify-center mb-15">
           <div className="mb-12">
            <BackButton className="mb-31" destination="/manufacturers" />
           </div>
            <div className="bg-white rounded-xl p-6 flex flex-col md:flex-row items-start">
                <div className="md:w-20/70 w-fit flex-shrink-0 mr-6 mb-4 md:mb-0">
                    <img src={manufacturer.logoUrl} alt={manufacturer.name} className="w-full h-auto" />
                </div>
                
                <div className="md:w-2/3 w-full">
            
                    <h2 className="text-5xl font-bold mb-4 text-black">{manufacturer.name}</h2>
                    
                    
                    <p className="text-xl text-gray-600 mb-4">Established: {manufacturer.establishedYear}</p>
                    
                   
                    <p className="text-lg text-gray-700">{manufacturer.description}</p>
                </div>
            </div>
        </div>
    );
    
}

export default DetailsManufacturer;