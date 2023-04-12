import { useState } from 'react'
import userService from '../services/users'
import { useQuery } from 'react-query'
import UserDetail from './UserDetail'
import { Link } from 'react-router-dom'

const UserList = () => {
    const usersResult = useQuery('users', userService.getAll, {
        refetchOnWindowFocus: false,
    })

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
                        <Link className="user-name" to={`/users/${user.id}`}>{user.name}</Link>
                        <div className="user-blog">{user.blogs.length}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserList