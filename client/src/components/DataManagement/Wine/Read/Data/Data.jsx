import { BiShow } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineStar } from 'react-icons/ai';
import Details from "../Details";
import { Link } from "react-router-dom";
import { MdOutlineDelete, MdAddShoppingCart } from 'react-icons/md';

const Data = ({ filteredWines, openModal, addToFavorites, addToCart, isAdmin, closeModal, visible }) => {
    return(
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
                                    visible && (
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
    );
}

export default Data;