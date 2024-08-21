import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import Spinner from "../../../HomePage/Spinner/Spinner";

const ReadManufacturer = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_URL = "http://localhost:3000/";


    useEffect(() => {
   
        fetch(API_URL + "manufacturers")
            .then(response => response.json())
            .then(data => {
                setManufacturers(data.manufacturers);
                setLoading(false);
               
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });

        
    }, []);

    return (
        <div className="p-4">
        <h1 className="text-5xl font-extrabold text-center mb-4">Manufacturers</h1>
        <div className="flex justify-center mb-4">
            <Link to="/manufacturers/create">
                <MdOutlineAddBox className="text-sky-800 text-4xl" />
            </Link>
        </div>
    
        <div className="flex flex-col items-center">
            {loading ? (
                <Spinner />
            ) : (
                <div className="overflow-x-auto w-full max-w-4xl">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Manufacturer Name
                                </th>
                                <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Year Established
                                </th>
                                <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {manufacturers.length > 0 ? (
                                manufacturers.map((manufacturer) => (
                                    <tr key={manufacturer.id} className="border-b">
                                        <td className="py-2 px-4 text-black">{manufacturer.name}</td>
                                        <td className="py-2 px-4 text-black">{manufacturer.country}</td>
                                        <td className="py-2 px-4 text-black">{manufacturer.establishedYear}</td>
                                        <td className="py-2 px-4 flex space-x-4 items-center justify-center">
                                            <Link to={`/manufacturers/details/${manufacturer._id}`}><BsInfoCircle className="text-3xl text-blue-300 hover:text-black cursor-pointer" /> </Link>
                                            <Link to={`/manufacturers/edit/${manufacturer._id}`}><AiOutlineEdit className="text-2xl text-yellow-600" /></Link>
                                            <Link to={`/manufacturers/delete/${manufacturer._id}`}><MdOutlineDelete className="text-2xl text-red-600" /></Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="py-2 px-4 text-center text-gray-500">
                                        No manufacturers available
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

export default ReadManufacturer;