import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const blog = {
    title: 'This test title should pass ',
    author:  'An author ',
    url:  'a url '
}

test('renders content', async () => {
    const handleMock = jest.fn()

    const component = render(
        <BlogForm handleCreateBlog={handleMock} />
    )

    const form = await component.container.querySelector('form')
    const titleInput = component.container.querySelector('input[name="title"]')
    const authorInput = component.container.querySelector('input[name="author"]')
    const urlInput = component.container.querySelector('input[name="url"]')

    fireEvent.change(titleInput, { 
        target: { value: blog.title } 
    })
    fireEvent.change(authorInput, { 
        target: { value: blog.author } 
    })
    fireEvent.change(urlInput, { 
        target: { value: blog.url } 
    })
    fireEvent.submit(form)

    expect(handleMock).toBeCalledWith(blog)
})
