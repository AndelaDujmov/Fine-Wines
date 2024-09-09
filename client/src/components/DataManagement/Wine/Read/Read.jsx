import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete, MdAddShoppingCart } from 'react-icons/md';
import { BiShow } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineStar } from 'react-icons/ai';
import Details from "./Details";
import { UserContext } from "../../../../../context/userContext";
import toast from "react-hot-toast";

const Read = () => {
    const [wines, setWines] = useState([]);
    const [modal, showModal] = useState({ visible: false, wine: null });
    const { user } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [wineTypeFilter, setWineTypeFilter] = useState('');
    const [manufacturerFilter, setManufacturerFilter] = useState('');
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        const fetchWinesAndManufacturers = async () => {
          
            try {
                const winesResponse = await axios.get("wines");
                const winesData = winesResponse.data.wines;

                const manufacturersResponse = await axios.get("manufacturers", { withCredentials: true });
                const manufacturersData = manufacturersResponse.data.manufacturers;
                setManufacturers(manufacturersData);

                const winesWithManufacturerNames = await Promise.all(winesData.map(async (wine) => {
                    try {
                        const manufacturer = manufacturersData.find(m => m._id === wine.manufacturer);
                        return { ...wine, manufacturerName: manufacturer ? manufacturer.name : 'Unknown' };
                    } catch (error) {
                        console.error("Error fetching manufacturer:", error);
                        return wine; 
                    }
                }));
             
                setWines(winesWithManufacturerNames);
            } catch (error) {
                console.error("Error fetching wines:", error);
            }
        };

        fetchWinesAndManufacturers();

        if (user && user.isAdmin)
            setIsAdmin(true);
        else
            setIsAdmin(false);
    }, [user]);

    const filteredWines = wines.filter(wine => {
        return (
            (!wineTypeFilter || wine.type === wineTypeFilter) &&
            (!manufacturerFilter || wine.manufacturerName === manufacturerFilter)
        );
    });

    const openModal = (wine) => {
        showModal({ visible: true, wine: wine })
    }

    const closeModal = () => {
        showModal({ visible: false, wine: null })
    }

    const addToFavorites = async (wineId) => {
        axios.post(`/wishlist/add/${wineId}`, { withCredentials : true })
        .then(response => (
            toast.success('Successfully added to the wishlist')
        ))
        .catch(err => (
            toast.error('An error has occured')
        ))
    }

    const addToCart = async (wineId) => {
        axios.post(`/cart/add/${wineId}`, { withCredentials : true })
        .then(response => (
            toast.success('Successfully added to the cart')
        ))
        .catch(err => (
            toast.error('An error has occured')
        ))
    }

    return (
        <div className="p-4">
              <div className="flex justify-center items-center mb-4 relative">
              <h1 className="text-5xl font-extrabold uppercase text-center">Wine List</h1>

                {isAdmin && (
                    <Link to="/wines/create">
                        <MdOutlineAddBox className='text-sky-800 text-4x1' />
                    </Link>
                )}
            </div>

            <div className="flex space-x-4 mb-8">
                <select
                    value={wineTypeFilter}
                    onChange={(e) => setWineTypeFilter(e.target.value)}
                    className="border-2 border-gray-500 py-2 px-4 text-black"
                >
                    <option value="">All Types</option>
                    <option value="Red">Red</option>
                    <option value="White">White</option>
                    <option value="Rose">Rose</option>
                </select>

                <select
                    value={manufacturerFilter}
                    onChange={(e) => setManufacturerFilter(e.target.value)}
                    className="border-2 border-gray-500 py-2 px-4 text-black"
                >
                    <option value="">All Manufacturers</option>
                    {manufacturers.map((manufacturer) => (
                        <option key={manufacturer._id} value={manufacturer.name}>
                            {manufacturer.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(
                    filteredWines.length > 0 ? (
                        filteredWines.map((wine) => (
                            <div
                                key={wine.id}
                                className="wine-item p-4 border border-gray-200 rounded-md bg-white shadow-md"
                            >
                                <h2 className="text-xl font-semibold mb-2 text-black">{wine.name}</h2>
                                <h3 className="text-xs font-semibold mb-2 text-black">{wine.manufacturerName}</h3>
                                <p className="text-sm mb-1 text-black">{wine.price} &euro;</p>
                                <div className="flex justify-center gap-x-4">
                                    <BiShow className="text-3xl text-blue-300 hover:text-black cursor-pointer" onClick={() => openModal(wine)}/>
                                    {isAdmin && (
                                        <>
                                            <Link to={`/wines/edit/${wine._id}`}><AiOutlineEdit className="text-2xl text-yellow-600" /></Link>
                                            <Link to={`/wines/delete/${wine._id}`}><MdOutlineDelete className="text-2xl text-red-600" /></Link>
                                        </>
                                    )}
                                    {!isAdmin && (
                                        <>
                                            <AiOutlineStar onClick={() => addToFavorites(wine._id)} className="text-2xl text-blue-600" />
                                            <MdAddShoppingCart onClick={() => addToCart(wine._id)} className="text-2xl text-green-600" />
                                        </>
                                    )}
                                </div>
                                {
                                    modal.visible && (
                                        <Details wine={modal.wine} onClose={closeModal} />
                                    )
                                }
                            </div>
                        ))
                    ) : (
                        <p>No wines available</p>
                    )
                )}
            </div>
        </div>
    );
}

export default Read;