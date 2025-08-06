const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  }
  catch (e) {
    next(e)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
  catch (e) {
    next(e)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
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