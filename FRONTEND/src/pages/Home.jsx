import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../Components/Spinner'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'
import BooksCard from '../Components/home/BooksCard.jsx'
import BooksTable from '../Components/home/BooksTable.jsx'
const Home = () => {
    const [books, setbooks] = useState([])
    const [loading, setloading] = useState(false)
    const [showtype, setshowtype] =useState('table')
    useEffect(() => {
        setloading(true)
        axios
        .get("http://localhost:5000/")
        .then((res)=>{
            setbooks(res.data.data);
            setloading(false);
        })
        .catch((err)=>{
            console.log(err);
            setloading(false);
        })
    }, [])
    
  return (
    <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' 
            onClick={()=> setshowtype('table')}>
                TABLE
            </button>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' 
            onClick={()=> setshowtype('card')}>
                CARD
            </button>
        </div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>
                Book list
            </h1>
            <Link to='/books/create'>
                <MdOutlineAddBox className='text-sky-800 text-4xl' />
            </Link>
        </div>
        {loading ? (
        <Spinner />
      ) : showtype === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  )
}

export default Home