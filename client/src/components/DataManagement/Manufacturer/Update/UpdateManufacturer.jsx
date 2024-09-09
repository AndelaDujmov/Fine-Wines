import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../HomePage/BackButton/BackButton";
import axios from "axios";
import { useParams } from 'react-router-dom';

const UpdateManufacturer = () => {
    const [name, setName] = useState('');
    const [country, setCountry] = useState("");
    const [establishedYear, setEstablishedYear] = useState(0);
    const [description, setDescription] = useState("");
    const [logoUrl, setLogoUrl] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
  
    const handleUpdate = () => {

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
            .put(`manufacturers/${id}`, data)
            .then(navigate('/manufacturers'))
            .catch((error) => {
                toast(error);
                navigate('/');
            });
        }
        else
            alert('The year given is not valid!')
    }

    useEffect(() => {
        const fetchManufacturer = async () => {
            try {
                const manufacturerData = await axios.get(`manufacturers/${id}`, { withCredentials: true });
                const manufacturer = manufacturerData.data.manufacturer;
                setName(manufacturer.name);
                setCountry(manufacturer.country);
                setDescription(manufacturer.description);
                setEstablishedYear(manufacturer.establishedYear);
                setLogoUrl(manufacturer.logoUrl);
             
            } catch (error) {
                alert("Error fetching data:", error);
            }
        };
    
        fetchManufacturer();
    }, [id]);
    
    return (<>
      <div className="flex items-start justify-center p-6">
   
    <div className="w-1/3 flex-shrink-0 mr-6">
        <img src={logoUrl} alt="Manufacturer Logo" className="w-full h-auto rounded-md" />
    </div>

   
    <div className="flex-1 border-2 border-sky-400 rounded-xl p-4">
        <BackButton destination="/manufacturers" />
        <h1 className="text-3xl my-4">Create Manufacturer</h1>

        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Name</label>
            <input 
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Country</label>
            <input 
                type="text"
                name="country"
                value={country}
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
                value={establishedYear}
                onChange={(e) => setEstablishedYear(e.target.value)}
                className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Description</label>
            <input 
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Logo</label>
            <input 
                type="url"
                name="logo"
                value={logoUrl}
                placeholder="https://example.com"
                onChange={(e) => setLogoUrl(e.target.value)}
                className="border-2 border-gray-500 py-2 w-full text-black"
            />
        </div>
        
        <button className="p-2 bg-gray-400 text-black" onClick={handleUpdate}>Update</button>
    </div>
</div>

    </>)
}

export default UpdateManufacturer;