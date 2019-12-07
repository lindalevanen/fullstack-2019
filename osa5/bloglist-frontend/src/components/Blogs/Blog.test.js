import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

describe('Blog', () => {
  let component
  let blogProps

  const blog = {
    title: 'A great blog',
    author: 'A great author',
    url: 'www.blog.com',
    likes: 5,
    user: {
      username: 'aGreatUsername'
    }
  }

  beforeEach(() => {
    const onBlogLikeMock = jest.fn()
    const onBlogRemoveMock = jest.fn()

    blogProps = {
      blog,
      onBlogLike: onBlogLikeMock,
      onBlogRemove: onBlogRemoveMock
    }
  })

  test('renders only title and author when the item is not active', () => {
    component = render(
      <Blog {...blogProps} />
    )

    const titleAuthorDiv = component.container.querySelector('.title-author')
    expect(titleAuthorDiv).toHaveTextContent('A great blog')
    expect(titleAuthorDiv).toHaveTextContent('A great author')


    const activeDiv = component.container.querySelector('.active-wrapper')
    expect(activeDiv).toBeNull()
  })

  test('clicking the item shows the active content', async () => {
    component = render(
      <Blog {...blogProps} />
    )

    const wrapperDiv = component.container.querySelector('.blog-item')
    fireEvent.click(wrapperDiv)

    const titleAuthorDiv = component.container.querySelector('.title-author')
    expect(titleAuthorDiv).toHaveTextContent('A great blog')
    expect(titleAuthorDiv).toHaveTextContent('A great author')

    const activeDiv = component.container.querySelector('.active-wrapper')
    expect(activeDiv).toBeTruthy()
    expect(activeDiv).toHaveTextContent(blog.url)
    expect(activeDiv).toHaveTextContent('5 likes')
    expect(activeDiv).toHaveTextContent('Added by aGreatUsername')
  })
})