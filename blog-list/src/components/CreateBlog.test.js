import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('Create blog form', () => {
    let createBlog
    const blog = {
        title: 'black adam review',
        author: 'rotten tomato',
        url: 'https://www.rottentomatoes.com/m/black_adam',
        likes: 39
    }

    beforeEach(() => {
        createBlog = jest.fn()
        render(<CreateBlog createBlog={createBlog} />)
    })

    test('call submit handler with right details', async () => {
        const user = userEvent.setup()

        const submitButton = screen.getByText('create')
        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')

        await userEvent.type(titleInput, blog.title)
        await userEvent.type(authorInput, blog.author)
        await userEvent.type(urlInput, blog.url)
        await userEvent.click(submitButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
        expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
        expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
    })
})