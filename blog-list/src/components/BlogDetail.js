const BlogDetail = ({ blog, likeClick, user }) => {
    const onLikeClick = async (e) => {
        await likeClick(blog);
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
        </div>
    )
}

export default BlogDetail