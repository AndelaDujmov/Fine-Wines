import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete, MdAddShoppingCart } from 'react-icons/md';
import { UserContext } from "../../../../../context/userContext";
import toast from "react-hot-toast";
import Data from "./Data/Data";
import Filters from "./Filters/Filters";

const Read = () => {
    const [wines, setWines] = useState([]);
    const [modal, showModal] = useState({ visible: false, wine: null });
    const { user } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [wineFilters, setWineFilters] = useState(null);
    const [manufacturerFilter, setManufacturerFilter] = useState(null);
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        const fetchWinesAndManufacturers = async () => {
          
            try {
                const winesResponse = await axios.get("wines", {
                    params: {
                        manufacturer: manufacturerFilter,
                        type: wineFilters
                    }
                });
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
    }, [user, wineFilters, manufacturerFilter]);

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
        <div className="p-4 mt-12">
              <div className="flex justify-center items-center mb-4 relative">
              <h1 className="text-5xl font-extrabold text-center mb-4">Wines</h1><br/>
             <div className="flex justify-center mb-4">
                {
                    isAdmin && (
                        <Link to="/wines/create">
                            <MdOutlineAddBox className="text-sky-800 text-4xl" />
                        </Link>
                    )
                }
            </div>
            </div>

            <Filters wineTypeFilter={wineFilters} setWineTypeFilter={setWineFilters} manufacturerFilter={manufacturerFilter} setManufacturerFilter={setManufacturerFilter} manufacturers={manufacturers} />

            <Data filteredWines={wines} visible={modal.visible} openModal={openModal} addToFavorites={addToFavorites} addToCart={addToCart} isAdmin={isAdmin} closeModal={closeModal} />
        </div>
    );
}

export default Read;