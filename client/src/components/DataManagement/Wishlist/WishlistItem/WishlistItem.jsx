import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const WishlistItem = ({ item }) => {
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    axios.get(`wines/${item.product}`, { withCredentials: true })
      .then(response => {
        setItemName(response.data.wine.name);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleDelete = (itemId) => {
    axios.delete(`wishlist/remove/${itemId}`, { withCredentials: true })
      .then(() => {
        toast.success('Item deleted!');
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      })
      .catch(error => {
        toast.error("Error deleting item: ", error.message);
      });
  };
  /*
  const handleAddToCart = (itemId) => {
    // Handle adding item to cart
    axios.post(`cart/add`, { itemId }, { withCredentials: true })
      .then(() => {
        console.log("Item added to cart");
        // Optionally, you could update the UI or show a message
      })
      .catch(error => {
        console.error("Error adding item to cart: ", error);
      });
  };
  */

  return (
    <>
        <div key={item.id} className="border p-4 mb-2 bg-gray-800 rounded">
            <p className="text-white">{itemName}</p>
            <div className="mt-2">
            <button
                
                className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
            >
                Add to Cart
            </button>
            <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white py-1 px-3 rounded"
            >
                Delete
            </button>
            </div>
        </div>
    </>
  );
};

export default WishlistItem;
