import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../HomePage/BackButton/BackButton";
import axios from "axios";
import toast from "react-hot-toast";

const Create = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [alcoholPercentage, setAlcoholPercentage] = useState(0);
    const [type, setType] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);

    const handleSave = () => {
        const data = {
            name,
            price,
            alcoholPercentage,
            type,
            manufacturer
        };
        console.log(data);
        axios
        .post("wines/add", data)
        .then(() => {
            navigate('/wines')
            toast.success('Successfully added!');
        })
        .catch((error) => {
            console.log(error);
            navigate('/');
        });
    }

    useEffect(() => {
        axios.get("manufacturers")
        .then(response => {
            setManufacturers(response.data.manufacturers);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });

    }, []);

    const navigate = useNavigate();
    
    return (<>
      <BackButton destination="/wines" />
      <h1 className="text-3xl my-4">Create Wine</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Name</label>
            <input 
            type="text"
            name="name"
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
            onChange={(e) => setAlcoholPercentage(e.target.value)}
            className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Type</label>
            <input 
            type="text"
            name="type"
            onChange={(e) => setType(e.target.value)}
            className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Manufacturer</label>
            <select 
            name="manufacturer"
            onChange={(e) => setManufacturer(e.target.value)}
            className="border-2 border-gray-500 py-2 w-full text-black text-center"
            >
                { 
                    manufacturers.map(manufacturer => (
                        <option className="text-black" key={manufacturer.id} value={manufacturer._id}>{manufacturer.name}</option>
                    ))
                }
            </select>
        </div>
        <button className="p-2 bg-gray-400 m-8 text-black" onClick={handleSave}>Save</button>
      </div>
    </>)
}

export default Create;