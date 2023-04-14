const listHelper = require('../utils/list_helper')

const multipleBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

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

const listWithSameMaxLike = [
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
        "likes": 2285,
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
        "likes": 2285,
        "id": "630b7f951ad6f42bd6425994"
    },
    {
        "title": "15 Useful Custom React Hooks for Your Next Web App",
        "author": "Chris1993",
        "url": "https://medium.com/@Chris1993/15-useful-custom-react-hooks-for-your-next-web-app-c5902d868f4c",
        "likes": 1896,
        "id": "630e22edbfd9aa945c375596"
    },
]

describe('favorite blog',() => {
    test('of empty array is {}',() =>{
        expect(listHelper.favoriteBlog([])).toEqual({})
    })

    test('of one value is return right',() => {
        const expectedObject = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
        }
        expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(expectedObject)
    })

    test('of many value is return right',() => {
      const expectedObject={
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      }
      expect(listHelper.favoriteBlog(multipleBlogs)).toEqual(expectedObject)
    })

    test('of many value with same maximum like is return first value',() => {
      const expectedObject={
        "title": "Deep dive into the Event Loop of NodeJS ➰",
        "author": "Muhammad Talha Siddique",
        "likes": 2285,
      }
      expect(listHelper.favoriteBlog(listWithSameMaxLike)).toEqual(expectedObject)
    })
})