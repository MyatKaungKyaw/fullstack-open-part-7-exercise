import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
    let container
    let handleLikeClick

    beforeEach(() => {
        const blog = {
            title: 'black adam review',
            author: 'rotten tomato',
            url: 'https://www.rottentomatoes.com/m/black_adam',
            likes: 39
        }
        const user = {}
        //mock function
        handleLikeClick = jest.fn()
        const deleteBlog = jest.fn()

        container = render(
            <Blog
                blog={blog}
                handleLikeClick={handleLikeClick}
                user={user}
                deleteBlog={deleteBlog}
            />
        ).container
    })

    test('renders only title and author as default', () => {
        const div = screen.getByText('black adam review rotten tomato')
        expect(div).toBeDefined()
    })

    test('at start url and likes are not rendered', () => {
        const a = screen.queryByText('https://www.rottentomatoes.com/m/black_adam')
        expect(a).not.toBeInTheDocument()

        const likes = screen.queryByText('likes : 39')
        expect(likes).not.toBeInTheDocument()
    })

    test('after click to view button, details are display', async () => {
        //apply workarounds and mock the UI layer to simulate user 
        //interactions like they would happen in the browser.
        const user = userEvent.setup()

        const button = screen.getByText('view')
        await user.click(button)

        const link = screen.getByText('https://www.rottentomatoes.com/m/black_adam')
        expect(link).toBeDefined()

        const likes = screen.getByText('likes : 39')
        expect(likes).toBeDefined()
    })

    test('calls like onClick function', async () => {
        //apply workarounds and mock the UI layer to simulate user 
        //interactions like they would happen in the browser.
        const user = userEvent.setup()

        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        const likeButton = screen.getByText('like')
        await user.dblClick(likeButton)

        expect(handleLikeClick.mock.calls).toHaveLength(2)
    })
})