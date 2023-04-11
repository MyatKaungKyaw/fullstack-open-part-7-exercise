import { useState } from 'react'
import userService from '../services/users'
import { useQuery } from 'react-query'
import UserDetail from './UserDetail'

const UserList = () => {
    const [name,setName]=useState(null)
    const [blogs,setBlogs]=useState([])
    const usersResult = useQuery('userrs', userService.getAll, {
        refetchOnWindowFocus: false,
    })

    const userDetailClick = (user) =>{
        setName(user.name)
        setBlogs(user.blogs)
    }

    if (usersResult.isLoading) {
        return (
            <div>Loading users data</div>
        )
    }

    const users = usersResult.data
    return (
        <>
            <h2>Users</h2>
            <div className="user-grid-container">
                <div className="user-grid-item">
                    <div className="user-blog">Blogs created</div>
                </div>
                {users.map((user) => (
                    <div className="user-grid-item" key={user.id}>
                        <div 
                        className="user-name"
                        onClick={() => userDetailClick(user)}
                        name={user.name}
                        blogs={user.blogs}
                        >{user.name}</div>
                        <div className="user-blog">{user.blogs.length}</div>
                    </div>
                ))}
            </div>
            {name && <UserDetail name={name} blogs={blogs}/>}
        </>
    )
}

export default UserList