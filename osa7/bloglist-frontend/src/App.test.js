import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogsWrapper = component.container.querySelector('.blogs-wrapper')
    expect(blogsWrapper).toBeNull()
  })

  test('if user is logged in, app will render 3 blogs', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('user', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('tester logged in')
    )

    const blogItems = component.container.querySelectorAll('.blog-item')
    expect(blogItems.length).toBe(3)
  })
})
