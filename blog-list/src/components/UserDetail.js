const UserDetail = (detail) => {
    console.log('detail',detail)
    const name = detail.name
    const blogs = detail.blogs

    if(!detail){
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