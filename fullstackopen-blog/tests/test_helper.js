const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlog = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
]

const blogger = {
        username: 'john',
        name:'john snow',
        password:'john',
    }

const user = {
    username: 'morty',
    name:'morty snow',
    password:'morty'
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}


const generateTenSecTokenOf = async (username) => {
    const user = await User.findOne({username:username})
    const token = {
        username:user.username,
        id:user._id
    }

    return jwt.sign(
        token, 
        process.env.SECRET, 
        {expiresIn:10}
    )
}

module.exports = {
    initialBlog,
    blogsInDb,
    usersInDb,
    blogger,
    user,
    generateTenSecTokenOf,
}