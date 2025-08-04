const blog = require("../models/blog")

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}