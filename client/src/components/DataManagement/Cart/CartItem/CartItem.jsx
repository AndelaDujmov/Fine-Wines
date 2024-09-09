import { useEffect, useState } from "react";
import axios from "axios";
import { MdAdd, MdRemove } from "react-icons/md"; // Icons for add and remove

const CartItem = ({ item }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    axios.get(`/wines/${item.product}`, { withCredentials: true })
      .then(response => {
        setItemName(response.data.wine.name); 
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, [item.product]);

  const handleAdd = () => {
    axios.post(`/cart/add/${item.product}`, {}, { withCredentials: true })
      .then(() => {
        setQuantity(prevQuantity => prevQuantity + 1);
      })
      .catch(error => {
        console.error("Error adding item: ", error);
      });
  };

  const handleRemove = () => {
    if (quantity > 1) {
      axios.delete(`/cart/remove/${item.product}`, {}, { withCredentials: true })
        .then(() => {
          setQuantity(prevQuantity => prevQuantity - 1);
        })
        .catch(error => {
          console.error("Error removing item: ", error);
        });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 mb-2 border bg-gray-800 rounded-xl">
      <div className="flex items-center space-x-4">
        <span className="text-white text-lg font-bold">{itemName}</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleRemove}
          className="p-2 bg-red-600 text-white rounded-full"
         
        >
          <MdRemove />
        </button>
        <span className="text-white text-lg">{quantity}</span>
        <button
          onClick={handleAdd}
          className="p-2 bg-green-600 text-white rounded-full"
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
