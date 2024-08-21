import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import Spinner from "../../../HomePage/Spinner/Spinner";
import Details from "./Details";

const Read = () => {
    const [wines, setWines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, showModal] = useState(false);
    const API_URL = "http://localhost:3000/";


    useEffect(() => {
        setLoading(true);
   
        fetch(API_URL + "wines")
            .then(response => response.json())
            .then(data => {
                setWines(data.wines);
                setLoading(false);
               
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });

        
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
            <h1 className="text-5xl font-extrabold uppercase transform rotate-90 origin-top-left">Wine List</h1>


            <Link to="/wines/create">
                <MdOutlineAddBox className='text-sky-800 text-4x1' />
            </Link>

            {loading ? (
               <Spinner />
            ) : 
        (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wines.length > 0 ? (
                wines.map((wine) => (
                    <div
                        key={wine.id}
                        className="wine-item p-4 border border-gray-200 rounded-md bg-white shadow-md"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-black">{wine.name}</h2>
                        <p className="text-sm mb-1 text-black">Year: {wine.year}</p>
                        <p className="text-sm mb-1 text-black">Type: {wine.type}</p>
                        <p className="text-sm mb-1 text-black">Price: {wine.price} Eur</p>
                        <p className="text-sm mb-1">Region: {wine.region}</p>
                        <p className="text-sm">Description: {wine.description}</p>
                        <div className="flex justify-center gap-x-4">
                            <BiShow className="text-3xl text-blue-300 hover:text-black cursor-pointer" onClick={() => showModal(true)}/>
                            <BsInfoCircle className="text-3xl text-blue-300 hover:text-black cursor-pointer" />
                            <Link to={`/wines/edit/${wine._id}`}><AiOutlineEdit className="text-2xl text-yellow-600" /></Link>
                            <Link to={`/wines/delete/${wine._id}`}><MdOutlineDelete className="text-2xl text-red-600" /></Link>
                        </div>
                        {
                            modal && (
                                <Details wine={wine} onClose={() => showModal(false)} />
                            )
                        }
                    </div>
                ))
            ) : (
                <p>No wines available</p>
            )}
        </div>
    )}
</div>

</div>
    );
}
  
export default Read;