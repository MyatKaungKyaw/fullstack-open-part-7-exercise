const _ = require('lodash')

const dummy = blogs => {

    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((pval, cval) => pval + cval.likes, 0)
}

const favoriteBlog = blogs => {
    const blog = blogs.reduce((pval, cval) => pval.likes > cval.likes ? pval : cval, {})

    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    }
}

const mostBlogs = blogs => {
    const authorWitBlogCount = _.countBy(blogs, 'author')
    return _.map(authorWitBlogCount, (value, key) => {
        return {
            author: key,
            blogs: value
        }
    }).reduce((pval, cval) => pval.blogs > cval.blogs ? pval : cval, {})
}

const mostLikes = blogs => {
    const authorsBlogs = _.groupBy(blogs, 'author')
    const authorsTotalLike =  _.map(authorsBlogs, (blog, author) => {
       const likes = blog.reduce((pval,cval) => pval + cval.likes,0)
      return {
        author: author,
        likes:likes
      }
    })
return authorsTotalLike.reduce((pval,cval) => pval.likes > cval.likes ? pval : cval,{})
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}