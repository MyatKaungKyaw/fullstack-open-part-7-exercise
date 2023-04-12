const UserDetail = (props) => {
    const name = props.name
    const blogs = props.blogs

    if (!props.name) {
        return null
    }

    return (
        <>
            <h2>{name}</h2>
            <h3>added blogs</h3>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </>
    )
}

export default UserDetail