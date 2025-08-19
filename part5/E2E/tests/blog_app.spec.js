const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
            await loginWith(page, 'louloo', 'password')
            await expect(page.getByText('Louie Loo logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'louloo', 'wrong')
            await expect(page.getByText('Wrong username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'louloo', 'password')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'Blog Title', 'Author Art', 'www.blog.com')
            await expect(page.getByText('a new blog Blog Title by Author Art added')).toBeVisible()
        })

        describe('A blog created', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'Blog Title', 'Author Art', 'www.blog.com')
            })

            test('a blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText('1')).toBeVisible()
            })

            test('blog created by user can be deleted', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()

                page.once('dialog', async (dialog) => {
                    console.log(dialog.message())
                    await dialog.accept()
                })
                const deleteButton = page.getByRole('button', { name: 'remove' })
                await deleteButton.click()
                await deleteButton.waitFor({ state: 'detached' })

                await expect(page.getByText('Blog Title Author Art')).not.toBeVisible()
            })

            describe('Another user logs in', () => {
                beforeEach(async ({ page, request }) => {
                    await request.post('/api/users', {
                        data: {
                            name: 'Amy Aim',
                            username: 'amai',
                            password: 'amyaim'
                        }
                    })

                    await page.getByRole('button', { name: 'log out' }).click()
                    await loginWith(page, 'amai', 'amyaim')
                })

                test('blog created by another user cannot be deleted', async ({ page }) => {
                    await page.getByRole('button', { name: 'view' }).click()

                    page.once('dialog', async (dialog) => {
                        console.log(dialog.message())
                        await dialog.accept()
                    })
                    const deleteButton = page.getByRole('button', { name: 'remove' })
                    await deleteButton.click()

                    await expect(deleteButton).toBeVisible()
                    await expect(page.getByText('Blog Title Author Arthide')).toBeVisible()
                })
            })
        })
    })    
})


describe('Multiple blogs in database', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Louie Loo',
                username: 'louloo',
                password: 'password'
            }
        })
        
        const user = {
            username: 'louloo',
            password: 'password'
        }

        const response = await request.post('/api/login', { data: user })
        const body = await response.json()
        const token = body.token

        const blogPost = [
            {
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
            },
            {
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
            },
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
            },
            {
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 10,
            },
            {
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0,
            },
            {
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
            }
        ]

        for (const blog of blogPost) {
            await request.post('/api/blogs', {
                data: blog,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }

        await page.goto('')
    })

    test('blogs arranged in descending order of likes', async ({ page }) => {
        await loginWith(page, 'louloo', 'password')
        await expect(page.getByText('Louie Loo logged in')).toBeVisible()

        const allViewButtons = await page.getByRole('button', { name: 'view' }).all()

        for (const b of allViewButtons) {
            await allViewButtons[0].click()
        }

        const allLikes = await page.locator('.likeCount').all()
        
        let prev = parseInt(await allLikes[0].textContent())
        for (const l of allLikes) {
            const curr = parseInt(await l.textContent())
            expect(expect(prev).toBeGreaterThanOrEqual(curr))
            prev = curr
        }
    })
})