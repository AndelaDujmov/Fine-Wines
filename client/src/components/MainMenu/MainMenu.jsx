import { useEffect, useState } from "react";

const MainMenu = () => {
    const [wines, setWines] = useState([]);

    const API_URL = "http://localhost:5000/finewines/";

    useEffect(() => {
        fetch(API_URL+"wines")
        .then(response => response.json())
        .then(data => {
            setWines(data);
        })
    });

    return(
        <>
            {wines.length === 0 ? (
                <p>No wines available</p>
            ) : (
                <ul>
                    {wines.map((wine, index) => (
                        <li key={index}>{wine.name} - ${wine.price}</li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default MainMenu;