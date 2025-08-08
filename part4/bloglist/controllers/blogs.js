const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  }
  catch (e) {
    next(e)
  }
})

blogRouter.post('/', async (request, response, next) => {
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({...request.body, user: user._id})

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
  catch (e) {
    next(e)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  try {
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const blog = await Blog.findById(request.params.id)
    
    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
    }
    else {
      return response.status(400).json({ error: 'invalid delete from user' })
    }
    
    response.status(204).end()
  }
  catch (e) {
    next(e)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const likes = request.body.likes

  try {
    const blog = await Blog.findById(request.params.id)

    blog.likes = likes

    const updatedBlog = await blog.save()
    response.json(updatedBlog) 
  }
  catch (e) {
    next(e)
  }
    
})

module.exports = blogRouter