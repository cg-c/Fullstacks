const blog = require("../models/blog")
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, b) => {
    return sum + b.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let faveBlog = blogs[0] || null

  blogs.forEach(b => {
    if (b.likes > faveBlog.likes) {
      faveBlog = b
    }
  })

  return faveBlog
}

const mostBlogs = blogs => {
  const authors = _.groupBy(blogs, 'author');
  let maxAuthor = null
  let maxBlogs = 0

  Object.keys(authors).forEach(key => {
    if (authors[key].length > maxBlogs){
      maxAuthor = key
      maxBlogs = authors[key].length
    }
  })
 
  return {
    author: maxAuthor,
    blogs: maxBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}