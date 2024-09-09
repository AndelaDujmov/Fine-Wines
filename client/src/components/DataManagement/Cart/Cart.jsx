import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/userContext";
import axios from "axios";
import CartItem from "./CartItem/CartItem";
import toast from "react-hot-toast";

const Cart = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get(`cart`, { withCredentials: true })
      .then(response => {
        setItems(response.data.cart);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleCheckout = () => {
    axios.post(`cart/checkout`, { withCredentials: true })
      .then(response => {
        toast("Checkout successful");
        setItems([]);
      })
      .catch(error => {
        toast("Error during checkout: ", error);
      });
  };

  return (
    <>
      <h1 className="text-3xl text-white">{user.username}'s cart</h1>
      {
        items.length > 0 ? (
          <>
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white py-2 px-4 rounded mt-4"
            >
              Checkout
            </button>
          </>
        ) : (
          <small>No items in cart yet.</small>
        )
      }
    </>
  );
};

export default Cart;
