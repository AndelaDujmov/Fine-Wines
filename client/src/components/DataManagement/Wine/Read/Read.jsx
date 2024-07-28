import { React, useEffect, useState } from "react"
import axios from 'axios'
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { response } from "express"

const Read = () => {
    const [wines, setWines] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios
        .get('http://localhost:3000/wines')
        .then(response => {
            setWines(response.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center"></div>
        </div>
    );
}

export default Read;