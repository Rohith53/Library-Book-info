import React from 'react'
import { useState, useEffect } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

const editBook = () => {
    const [title, settitle] = useState('')
    const [author, setauthor]= useState('')
    const [publishYear, setpublishYear] = useState('')
    const [loading, setloading]=useState('')

    const navigate = useNavigate()
    const { id }= useParams()
    useEffect(()=>{
      setloading(true)
      axios.get(`http://localhost:5000/${id}`)
      .then((res)=>{
        setauthor(res.data.author)
        settitle(res.data.title)
        setpublishYear(res.data.publishYear)
        setloading(false)
      }).catch((err)=>{
        
        console.log(err)
      })
    },[])
    const handleeditbook = ()=>{
        const data ={
            title,
            author,
            publishYear
        }
        setloading(true)
        axios
        .put(`http://localhost:5000/${id}`, data)
        .then(()=>{
          setloading(false)
          enqueueSnackbar("book edited successfully",{ variant: 'success'})
          navigate('/books')
        })
        .catch((error)=>
          {
            setloading(false)
            enqueueSnackbar("book not created",{ variant: 'error'})
            console.log(error)
          }
        )
    }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setauthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setpublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleeditbook}>
          Save
        </button>
      </div>
    </div>
  );
  
}

export default editBook
