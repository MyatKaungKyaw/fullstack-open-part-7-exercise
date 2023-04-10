import userService from '../services/users'
import { useQuery } from 'react-query'

const UserList = () => {
    const usersResult = useQuery('userrs', userService.getAll, {
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
                        <div className="user-name">{user.name}</div>
                        <div className="user-blog">{user.blogs.length}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserList