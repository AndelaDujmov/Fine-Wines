import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../HomePage/BackButton/BackButton";
import axios from "axios";
import { useParams } from 'react-router-dom';

const Update = () => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [alcoholPercentage, setAlcoholPercentage] = useState(0);
    const [type, setType] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const { id } = useParams();

    const handleUpdate = () => {
        const data = {
            name,
            price,
            alcoholPercentage,
            type,
            manufacturer
        };
        console.log(data);
        axios
        .put(API_URL + `wines/${id}`, data)
        .then(navigate('/wines'))
        .catch((error) => {
            console.log(error);
            navigate('/');
        });
    }

   
    useEffect(() => {
        const fetchWineAndManufacturer = async () => {
            try {
                const manufacturersResponse = await axios.get("manufacturers",{ withCredentials: true });
                const manufacturerData = manufacturersResponse.data.manufacturers;
    
                const wineData = await axios.get(`wines/${id}`, { withCredentials: true });
                const wine = wineData.data.wine;
                setName(wine.name);
                setAlcoholPercentage(wine.alcoholPercentage);
                setManufacturer(wine.manufacturer);
                setType(wine.type);
                setPrice(wine.price);
                console.log(wine.name)
                setManufacturers(manufacturerData); 
                setLoading(false);
            } catch (error) {
                console.log("Error fetching data:", error);
                setLoading(false);
            }
        };
    
        fetchWineAndManufacturer();
    }, [id]);

    const navigate = useNavigate();
    
    return (<>
      <BackButton destination="/wines" />
      <h1 className="text-3xl my-4">Edit {name}</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Name</label>
            <input 
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Price</label>
            <input 
            type="number"
            name="price"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Alcohol Percentage</label>
            <input 
            type="number"
            step="0.01"
            name="alcoholPercentage"
            value={alcoholPercentage}
            onChange={(e) => setAlcoholPercentage(e.target.value)}
            className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Type</label>
            <input 
            type="text"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Manufacturer</label>
            <select 
            name="manufacturer"
            onChange={(e) => setManufacturer(e.target.value)}
            value={manufacturer}
            className="border-2 border-gray-500 py-2 w-full text-black text-center"
            >
                { 
                    manufacturers.map(manufacturer => (
                        <option className="text-black" key={manufacturer.id} value={manufacturer._id}>{manufacturer.name}</option>
                    ))
                }
            </select>
        </div>
        <button className="p-2 bg-gray-400 m-8 text-black" onClick={handleUpdate}>Update</button>
      </div>
    </>)
}

export default Update;