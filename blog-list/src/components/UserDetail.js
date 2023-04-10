const UserDetail = ({ name, blogs }) => {
    return (
        <>
            <h2>{name}</h2>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </>
    )
}