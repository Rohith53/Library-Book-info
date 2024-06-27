import React, { useState } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

const DeleteBook = () => {
  const [loading, setloading]=useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const handledelete = () =>{
    setloading(true)
    axios.delete(`http://localhost:5000/${id}`)
    .then(()=>{
      setloading(false)
      enqueueSnackbar("book deleted successfully",{ variant: 'success'})
      navigate('/books')
    }).catch((error)=>{
      enqueueSnackbar("book not created",{ variant: 'error'})
      setloading(false)
      console.log(error)
    })
  }
  return (
    <div className='p-4'>
    <BackButton />
    <h1 className='text-3xl my-4'>Delete Book</h1>
    {loading ? <Spinner /> : ''}
    <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
      <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

      <button
        className='p-4 bg-red-600 text-white m-8 w-full'
        onClick={handledelete}
      >
        Yes, Delete it
      </button>
    </div>
  </div>

  )
}

export default DeleteBook