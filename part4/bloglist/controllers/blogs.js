const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', (request, response, ) => {
  Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const user = request.user
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

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const user = request.user
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