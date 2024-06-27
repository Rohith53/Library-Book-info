import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"
import Spinner from "../Components/Spinner"
import BackButton from "../Components/BackButton"

const ShowBook = () => {
    const [books, setbook] = useState([])
    const [loading, setloading]= useState(false)
    const { id } = useParams()

    useEffect(() => {
      setloading(true)
      axios.
      get(`http://localhost:5000/${id}`)
      .then((res)=>{
        setbook(res.data)
        setloading(false)
      })
      .catch((err)=>{
        console.log(err)
        setloading(false)
      })
    }, [])
    
    return (
        <div className='p-4'>
          <BackButton />
          <h1 className='text-3xl my-4'>Show Book</h1>
          {loading ? (
            <Spinner />
          ) : (
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Id</span>
                <span>{books._id}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Title</span>
                <span>{books.title}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Author</span>
                <span>{books.author}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                <span>{books.publishYear}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                <span>{new Date(books.createdAt).toString()}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
                <span>{new Date(books.updatedAt).toString()}</span>
              </div>
            </div>
          )}
        </div>
      );
}

export default ShowBook
