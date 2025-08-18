const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
        data: {
            name: 'Louie Loo',
            username: 'louloo',
            password: 'password'
        }
    })
    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('louloo')
        await page.getByTestId('password').fill('password')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Louie Loo logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('louloo')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await page.getByTestId('username').fill('louloo')
        await page.getByTestId('password').fill('password')
        await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'create blog' }).click()
        await page.getByTestId('title').fill('Blog Title')
        await page.getByTestId('author').fill('Author Art')
        await page.getByTestId('url').fill('www.blog.com')
        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText('a new blog Blog Title by Author Art added')).toBeVisible()
    })

    describe('A blog created', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'create blog' }).click()
            await page.getByTestId('title').fill('Blog Title')
            await page.getByTestId('author').fill('Author Art')
            await page.getByTestId('url').fill('www.blog.com')
            await page.getByRole('button', { name: 'create' }).click()
        })
        
        test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('1')).toBeVisible()
        })

        test.only('blog created by user can be deleted', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).click()
            
            page.once('dialog',  async (dialog) => { 
                console.log(dialog.message())
                await dialog.accept()
            })
            const deleteButton = page.getByRole('button', { name: 'remove' })
            await deleteButton.click()
            await deleteButton.waitFor({ state: 'detached' })

            await expect(page.getByText('Blog Title Author Art')).not.toBeVisible()
        })
    })
  })
})