import express from "express"

import { Book } from "../MODELS/bookmodel.js"

const router = express.Router()

router.post('/books',async (req,res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send("send all required fields")
        }

        const newbook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newbook)

        return res.status(200).send(book)

    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})
router.get('/',async(req, res)=>{
    try {
        const books = await Book.find({
        })
        res.status(200).json({
            count: books.length,
            data: books
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error.message})
    }
})
router.get('/:id',async(req, res)=>{
    try {

        const { id } = req.params
        const book = await Book.findById(id)

        res.status(200).json(book)

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error.message})
    }
})
router.put('/:id',async(req, res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send("send all required fields")
        }

        const { id } = req.params

        const result = await Book.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(400).json({message: "book not found"})

        }
        return res.status(200).send({message: "book updated successfully"})


    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error.message})
    }
})
router.delete('/:id',async(req, res)=>{
    try {

        const { id } = req.params

        const result = await Book.findByIdAndDelete(id)

        if(!result){
            return res.status(400).json({message: "book not deleted"})
        }

        return res.status(200).send({message: "deleted successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error.message})
    }
})

export default router