const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initalBlogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initalBlogs.length)
})


test('unique idenitfier of blogs is id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(b => {
        if (!b.hasOwnProperty('id')) {
            throw new error("no id")
        }
    })
})


test('a blog can be added', async () => {
    const newBlog = {
        title: 'test',
        author: 'Mrs.test',
        url: 'test.com',
        likes: 347
    }

    const resultBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length + 1)
    assert.strictEqual(resultBlog.body.title, newBlog.title)
    assert.strictEqual(resultBlog.body.author, newBlog.author)
    assert.strictEqual(resultBlog.body.likes, newBlog.likes)
    assert.strictEqual(resultBlog.body.url, newBlog.url)
})


test('default likes is zero', async () => {
    const newBlog = {
        title: 'likes',
        author: 'Mr.like',
        url: 'like.com',
    }

    const resultBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length + 1)
    assert.strictEqual(resultBlog.body.likes, 0)
})


test('blogs without titles cannot be added', async () => {
    const newBlog = {
        author: 'Miss title',
        url: 'title.com',
        likes: 75
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length)
})


test('blogs without url not added', async () => {
    const newBlog = {
        title: 'url',
        author: 'Ms.url',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length)
})

test('deletion of a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)

    const blogsAtEnd = await helper.blogsInDb()
    const title = blogsAtEnd.map(b => b.title)
    const url = blogsAtEnd.map(b => b.url)
    assert(!title.includes(blogToDelete.title))
    assert(!url.includes(blogToDelete.url))

    assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length - 1)
})

test('update likes for a blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    likesUpdate = {
        ...blogToUpdate,
        likes: 8438
    }

    const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(likesUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(blogsAtStart.length, helper.initalBlogs.length)
    assert.deepStrictEqual(updatedBlog.body, likesUpdate)
})


after(async () => {
  await mongoose.connection.close()
})