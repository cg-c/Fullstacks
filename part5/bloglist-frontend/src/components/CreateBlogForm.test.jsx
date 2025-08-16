import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm />', () => {
    test('Create new blog', async () => {
        const createBlog = vi.fn()
        const user = userEvent.setup()

        let container = render(<CreateBlogForm addBlog={createBlog} />).container
        const submitButton = screen.getByText('create')

        const title = container.querySelector('#title-input')
        const author = container.querySelector('#author-input')
        const url = container.querySelector('#url-input')

        await userEvent.type(title, 'Tester Form')
        await userEvent.type(author, 'Miss Tester')
        await userEvent.type(url, 'www.test.com')
        await userEvent.click(submitButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0])
    })
})