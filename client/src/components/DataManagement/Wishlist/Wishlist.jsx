import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/userContext";
import axios from "axios";
import WishlistItem from "./WishlistItem/WishlistItem";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get(`wishlist`, { withCredentials: true })
      .then(response => {
        setItems(response.data.wishlist);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, [items]);

  return (
    <>
      <h1 className="text-3xl text-white">{user.username}'s wishlist</h1>
      {
        items.length > 0 ? (
          items.map(item => (
            <WishlistItem item={item} />
          ))
        ) : (
          <small>No items in wishlist yet.</small>
        )
      }
    </>
  );
};

export default Wishlist;
