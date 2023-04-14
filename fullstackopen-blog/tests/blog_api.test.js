const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
const blogEndPoint = '/api/blogs'

beforeAll ( async () => {
    const blogger = new User(helper.blogger)
    const user = new User(helper.user)
    await blogger.save()
    await user.save()
})

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogger = await User.findOne({username:helper.blogger.username})
    const blogs = helper.initialBlog.map(blog => new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blogger._id
    }))
    const promiseBlogs = blogs.map(blog => blog.save())
    await Promise.all(promiseBlogs)
})

describe('getting blogs',() =>{
    test('specific blog is within the returned blogs', async () => {
        await api
            .get(blogEndPoint)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('return blog object to contain id property', async () => {
        const blogs = await api.get(blogEndPoint)
        
        blogs.body.map(blog => {
            expect(blog).toHaveProperty('id')
        })
    })
})

describe('adding blog',() =>{
    test('a valid blog is added', async () => {
        const blogger = helper.blogger
        const bloggerToken = await helper.generateTenSecTokenOf(blogger.username)

        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
        }

        await api
            .post(blogEndPoint)
            .set('Authorization',`bearer ${bloggerToken}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await api.get(blogEndPoint)
        const titles = blogs.body.map(blog => blog.title)

        expect(blogs.body).toHaveLength(helper.initialBlog.length + 1)
        expect(titles).toContain('Canonical string reduction')
    })

    test('blog with no like property request is default to 0 value', async () => {
        const blogger = helper.blogger
        const bloggerToken = await helper.generateTenSecTokenOf(blogger.username)

        const blogWitNoLike = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        }

        await api
            .post(blogEndPoint)
            .set('Authorization',`bearer ${bloggerToken}`)
            .send(blogWitNoLike)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await api.get(blogEndPoint)
        const blog = blogs.body.find(blog => blog.title === 'Canonical string reduction')
        expect(blog.likes).toEqual(0)
    })

    test('blog with no title is not added', async () => {
        const blogger = helper.blogger
        const bloggerToken = await helper.generateTenSecTokenOf(blogger.username)
        const blogWitNoTitle = {
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes:5,
        }

        await api
        .post(blogEndPoint)
        .set('Authorization',`bearer ${bloggerToken}`)
        .send(blogWitNoTitle)
        .expect(400)
    })

    test('blog with no url is not added', async () => {
        const blogger = helper.blogger
        const bloggerToken = await helper.generateTenSecTokenOf(blogger.username)
        const blogWitNoURL = {
            title: "useId Hook Explained",
            author: "Ahsan Ali Mansoor",
            likes: 4,
        }

        await api
        .post(blogEndPoint)
        .set('Authorization',`bearer ${bloggerToken}`)
        .send(blogWitNoURL)
        .expect(400)
    })

    test('blog with no token is not added', async () => {
        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
        }

        const result = await api
            .post(blogEndPoint)
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('invalid token')
    })
})

describe('deleting blog',() => {
    test('success with status 204 if id is valid', async () => {
        const blogger=helper.blogger
        const bloggerToken = await helper.generateTenSecTokenOf(blogger.username)
        const blogsBeforeDelete = await helper.blogsInDb()
        const blogToDelete = blogsBeforeDelete[0]
        await api
        .delete(`${blogEndPoint}/${blogsBeforeDelete[0].id}`)
        .set('Authorization',`bearer ${bloggerToken}`)
        .expect(204)

        const blogsAfterDelete = await helper.blogsInDb()
        expect(blogsAfterDelete).toHaveLength(blogsBeforeDelete.length-1)

        const ids = blogsAfterDelete.map(blog => blog.id)
        expect(ids).not.toContain(blogToDelete.id)
    })
})

describe('updating blog',() => {
    test('success with status 201 if id is valid', async () =>{
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = 55

        await api
        .put(`${blogEndPoint}/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(201)
        .expect('Content-Type',/application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
        expect(blogsAtEnd).toContainEqual(blogToUpdate)
    })
    
    test('with only likes modify success with status 201 if id is valid', async () =>{
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const updLikes = blogToUpdate.likes +5
        blogToUpdate.likes = updLikes

        await api
        .patch(`${blogEndPoint}/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(201)
        .expect('Content-Type',/application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

        expect(blogsAtEnd).toContainEqual(blogToUpdate)
    })
})

afterAll(async () => {
    await User.deleteMany({})
    mongoose.connection.close()
})