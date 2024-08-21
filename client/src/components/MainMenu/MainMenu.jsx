import React, { useEffect, useState } from "react";

const MainMenu = () => {
    const [wines, setWines] = useState([]);

    const API_URL = "http://localhost:3000/";

    useEffect(() => {
        fetch(API_URL + "wines")
            .then(response => response.json())
            .then(data => {
                setWines(data);
              //  console.log(data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []); 

    return (
        <>
        <p>Welcome</p>
        </>
    );
}

export default MainMenu;
