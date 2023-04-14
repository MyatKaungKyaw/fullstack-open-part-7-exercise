const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user',{username:1,name:1})
    response.json(blogs)
})

blogsRouter.post('/',middleware.tokenExtractor,middleware.userExtractor, async (request, response) => {
    const body = request.body
    if (!body.title || !body.url) {
        return response.status(400).end()
    }

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
  
    response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.tokenExtractor,middleware.userExtractor, async (request, response) => {
    const blogId = request.params.id
    const user = request.user

    const toDeleteBlog = await Blog.findById(blogId)

    if(!toDeleteBlog){
        return response.status(401).json({error:'invalid blog id'})
    }else if(toDeleteBlog.user.toString() !== user._id.toString()){
        return response.status(401).json({error:'only blog creator can delete blog'})
    }

    await Blog.findByIdAndDelete(blogId)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user,
    }
    const updBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.status(201).json(updBlog)
})

blogsRouter.patch('/:id', async (request,response) => {
    const id = request.params.id
    const likes = request.body.likes

    if (likes === null){
        return response.status(400).json({error:'no likes value to update'})
    }

    const updBlog = await Blog.findByIdAndUpdate(id,{likes:likes},{new:true})
    response.status(201).json(updBlog)
})

module.exports = blogsRouter