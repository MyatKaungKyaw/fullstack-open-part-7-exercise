const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const app = require('../app')

const api = supertest(app)

describe('when there is user data in database', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({
            username: 'root',
            name: 'origin root',
            password: passwordHash
        })

        await user.save()
    })

    test('creation success with new user name', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'robin',
            name: 'robin hood',
            password: 'robin'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fail with existing username with status code 400', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: usersAtStart[0].username,
            name: 'some one',
            password: 'sEcret'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

describe('user input with username', () => {
    beforeAll(async () => {
        await User.deleteMany({})
    })

    afterAll(async () => {
        await User.deleteMany({})
    })

    test('empty to fail with 400 status and message', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: '',
            name:'someone',
            password: 'seKret'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type',/application\/json/)

        expect(result.body.error).toContain('username missing')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    
    test('less than three characters to fail with 400 status and message', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'My',
            name:'someone',
            password: 'seKret'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type',/application\/json/)

        expect(result.body.error).toContain('username length must be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

describe('user input with password',() => {
    test('empty to fail with 400 status and message', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'Mycroft',
            name:'someone',
            password: ''
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type',/application\/json/)

        expect(result.body.error).toContain('password missing')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('less than three characters to fail with 400 status and message', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'Mycroft',
            name:'someone',
            password: 'se'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type',/application\/json/)

        expect(result.body.error).toContain('password length must be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})