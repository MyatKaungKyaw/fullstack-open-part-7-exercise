const listHelper = require('../utils/list_helper')
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWithManyBlogs = [
    {
        "title": "useId Hook Explained",
        "author": "Ahsan Ali Mansoor",
        "url": "https://medium.com/@ahsan-ali-mansoor/useid-hook-explained-30bdd1c9813",
        "likes": 4,
        "id": "630b7ed71ad6f42bd6425991"
    },
    {
        "title": "Deep dive into the Event Loop of NodeJS ➰",
        "author": "Muhammad Talha Siddique",
        "url": "https://medium.com/@ztalha6/deep-dive-into-the-event-loop-of-nodejs-42ea60e055a2",
        "likes": 4,
        "id": "630b7f951ad6f42bd6425994"
    },
    {
        "title": "15 Useful Custom React Hooks for Your Next Web App",
        "author": "Chris1993",
        "url": "https://medium.com/@Chris1993/15-useful-custom-react-hooks-for-your-next-web-app-c5902d868f4c",
        "likes": 56,
        "id": "630e22edbfd9aa945c375596"
    },
    {
        "title": "useId Hook Explained",
        "author": "Ahsan Ali Mansoor",
        "url": "https://medium.com/@ahsan-ali-mansoor/useid-hook-explained-30bdd1c9813",
        "likes": 7,
        "id": "630b7ed71ad6f42bd6425991"
    },
    {
        "title": "Deep dive into the Event Loop of NodeJS ➰",
        "author": "Muhammad Talha Siddique",
        "url": "https://medium.com/@ztalha6/deep-dive-into-the-event-loop-of-nodejs-42ea60e055a2",
        "likes": 45,
        "id": "630b7f951ad6f42bd6425994"
    },
    {
        "title": "15 Useful Custom React Hooks for Your Next Web App",
        "author": "Chris1993",
        "url": "https://medium.com/@Chris1993/15-useful-custom-react-hooks-for-your-next-web-app-c5902d868f4c",
        "likes": 33,
        "id": "630e22edbfd9aa945c375596"
    },
    {
        "title": "useId Hook Explained",
        "author": "Ahsan Ali Mansoor",
        "url": "https://medium.com/@ahsan-ali-mansoor/useid-hook-explained-30bdd1c9813",
        "likes": 235,
        "id": "630b7ed71ad6f42bd6425991"
    },
    {
        "title": "Deep dive into the Event Loop of NodeJS ➰",
        "author": "Muhammad Talha Siddique",
        "url": "https://medium.com/@ztalha6/deep-dive-into-the-event-loop-of-nodejs-42ea60e055a2",
        "likes": 785,
        "id": "630b7f951ad6f42bd6425994"
    },
    {
        "title": "15 Useful Custom React Hooks for Your Next Web App",
        "author": "Chris1993",
        "url": "https://medium.com/@Chris1993/15-useful-custom-react-hooks-for-your-next-web-app-c5902d868f4c",
        "likes": 478,
        "id": "630e22edbfd9aa945c375596"
    },
    {
        "title": "useId Hook Explained",
        "author": "Ahsan Ali Mansoor",
        "url": "https://medium.com/@ahsan-ali-mansoor/useid-hook-explained-30bdd1c9813",
        "likes": 1583,
        "id": "630b7ed71ad6f42bd6425991"
    },
    {
        "title": "Deep dive into the Event Loop of NodeJS ➰",
        "author": "Muhammad Talha Siddique",
        "url": "https://medium.com/@ztalha6/deep-dive-into-the-event-loop-of-nodejs-42ea60e055a2",
        "likes": 1896,
        "id": "630b7f951ad6f42bd6425994"
    },
    {
        "title": "15 Useful Custom React Hooks for Your Next Web App",
        "author": "Chris1993",
        "url": "https://medium.com/@Chris1993/15-useful-custom-react-hooks-for-your-next-web-app-c5902d868f4c",
        "likes": 2285,
        "id": "630e22edbfd9aa945c375596"
    },
]

test('dummy return one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty array is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('of array with one blog is value itself', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of array with many blogs is calculated right',() => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(7411)
    })
})
