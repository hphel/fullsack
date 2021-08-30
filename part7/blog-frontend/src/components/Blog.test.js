import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'This test title should pass ',
    author:  'An author ',
    likes: 0,
    url:  'a url ',
    user: {
        username:  'abcd '
    }
}

test('renders content', async () => {

    const component = render(
        <Blog blog={blog} owned={false} onLike={() => {}} onRemove={() => {}} />
    )

    expect(component.container).toHaveTextContent(
        blog.title
    )
    expect(component.container).toHaveTextContent(
        blog.author
    )
    expect(component.container).not.toHaveTextContent(
        blog.likes
    )
    expect(component.container).not.toHaveTextContent(
        blog.url
    )
})

test('renders detail content on view click', async () => {
    const blog = {
        title: 'This test title should pass ',
        author:  'An author ',
        likes: 0,
        url:  'a url ',
        user: {
            username:  'abcd '
        }
    }

    const component = render(
        <Blog blog={blog} owned={false} onLike={() => {}} onRemove={() => {}} />
    )

    expect(component.container).not.toHaveTextContent(
        blog.likes
    )
    expect(component.container).not.toHaveTextContent(
        blog.url
    )

    const button = await component.findByText('view')

    button.click()
    expect(component.container).toHaveTextContent(
        blog.likes
    )
    expect(component.container).toHaveTextContent(
        blog.url
    )
})


test('onLike handler is called twice on click like', async () => {
    const onLike = jest.fn()
    const component = render(
        <Blog blog={blog} owned={false} onLike={onLike} onRemove={() => {}} />
    )

    expect(component.container).not.toHaveTextContent(
        blog.likes
    )
    expect(component.container).not.toHaveTextContent(
        blog.url
    )

    const viewButton = await component.findByText('view')

    viewButton.click()

    const likeButton = await component.findByText('like')
    likeButton.click()
    likeButton.click()
    expect(onLike).toBeCalledTimes(2)
})