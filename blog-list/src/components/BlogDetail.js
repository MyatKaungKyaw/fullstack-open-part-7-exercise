import { useState } from "react";

const BlogDetail = ({ blog, likeClick, user, handleComment }) => {
    const [comment, setComment] = useState('')
    const onLikeClick = async (e) => {
        await likeClick(blog);
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        handleComment(blog.id,comment)
        setComment('')
    }

    const commentOnChange = (e) => {
        setComment(e.target.value)
    }

    if(blog === null){
        return null
    }

    return (
        <div>
            <h3>{blog.title + ' ' + blog.author}</h3>
            <a
                href={blog.url}
                target="_blank"
                rel="noreferrer"
                className="blog-url blog-link"
            >
                {blog.url}
            </a>
            <div>
                <p className="blog-like">likes : {blog.likes} </p>
                <button onClick={onLikeClick} className="blog-like">
                    like
                </button>
            </div>
            <div>added by {user.name}</div>
            <h4>comments</h4>
            <form onSubmit={handleCommentSubmit}>
                <input
                    type='text'
                    value={comment}
                    name='comment'
                    onChange={commentOnChange}
                />
                <button type='submit'>add comment</button>
            </form>
            <ul>
                {blog.comments.map(comment => <li key={comment.id }>{comment.comment}</li>)}
            </ul>
        </div>
    )
}

export default BlogDetail