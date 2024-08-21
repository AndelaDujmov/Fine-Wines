import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../HomePage/BackButton/BackButton";
import axios from "axios";

const CreateManufacturer = () => {
    const API_URL = "http://localhost:3000/";
    const [name, setName] = useState('');
    const [country, setCountry] = useState("");
    const [establishedYear, setEstablishedYear] = useState(0);
    const [description, setDescription] = useState("");
    const [logoUrl, setLogoUrl] = useState('');
    const navigate = useNavigate();
  
    const handleSave = () => {

        const data = {
            name,
            country,
            establishedYear,
            description,
            logoUrl,
        };
        if (establishedYear >= 1800 && establishedYear <= new Date().getFullYear())
        {
            axios
            .post(API_URL + "manufacturers/add", data)
            .then(navigate('/manufacturers'))
            .catch((error) => {
                console.log(error);
                navigate('/');
            });
        }
        else
            alert('The year given is not valid!')
    }
    
    return (<>
      <BackButton destination="/manufacturers" />
      <h1 className="text-3xl my-4">Create Manufacturer</h1>
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
            <label className="text-xl mr-4 text-gray-500">Country</label>
            <input 
            type="text"
            name="name"
            onChange={(e) => setCountry(e.target.value)}
            className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Established Year</label>
            <input 
            type="number"
            name="establishedYear"
            max="9999"
            onChange={(e) => setEstablishedYear(e.target.value)}
            className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Description</label>
            <input 
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Logo</label>
            <input 
            type="url"
            name="logo"
            placeholder="https://example.com"
            onChange={(e) => setLogoUrl(e.target.value)}
            className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        
        <button className="p-2 bg-gray-400 m-8 text-black" onClick={handleSave}>Save</button>
      </div>
    </>)
}

export default CreateManufacturer;