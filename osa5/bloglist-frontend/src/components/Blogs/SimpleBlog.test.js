import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders title, author and likes correctly', () => {
  const blog = {
    title: 'A great blog',
    author: 'A great author',
    likes: 5
  }
  const onClickMock = jest.fn()
  const component = render(
    <SimpleBlog blog={blog} onClick={onClickMock} />
  )

  const titleAuthorDiv = component.container.querySelector('.title-author')
  expect(titleAuthorDiv).toHaveTextContent('A great blog')
  expect(titleAuthorDiv).toHaveTextContent('A great author')

  const likesDiv = component.container.querySelector('.likes')
  expect(likesDiv).toHaveTextContent('blog has 5 likes')
})

test('clicking like twice triggers the click handler twice', async () => {
  const blog = {
    title: 'A great blog',
    author: 'A great author',
    likes: 5
  }

  const onClickMock = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={onClickMock} />
  )

  const likeButton = component.container.querySelector('.like-button')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(onClickMock.mock.calls.length).toBe(2)
})