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


after(async () => {
  await mongoose.connection.close()
})