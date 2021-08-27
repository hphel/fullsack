function createBlog(title, author, url) {
    cy.get('input[name="title"]').clear()
    cy.get('input[name="author"]').clear()
    cy.get('input[name="url"]').clear()
    cy.get('input[name="title"]').type(title)
    cy.get('input[name="author"]').type(author)
    cy.get('input[name="url"]').type(url)
    cy.get('button[name="create"]').click()
}

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('login')
        cy.contains('username')
        cy.contains('password')
    })
    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('input[name="username"]').type('root')
            cy.get('input[name="password"]').type('secret')
            cy.contains('login').click()
            cy.contains('login').should('not.exist')
            cy.contains('Log out').click()
        })
        it('fails with wrong credentials', function () {
            cy.get('input[name="username"]').type('whatever')
            cy.get('input[name="password"]').type('nothing')
            cy.contains('login').click()
            cy.contains('Wrong credentials')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('input[name="username"]').type('root')
            cy.get('input[name="password"]').type('secret')
            cy.contains('login').click()
        })

        it('A blog can be created', function () {
            const title = 'Some title'
            cy.contains('Create new').should('not.exist')
            cy.contains('create new blog').click()
            cy.contains('Create new')
            cy.get('input[name="title"]').type(title)
            cy.get('input[name="author"]').type('Some author')
            cy.get('input[name="url"]').type('Some url')
            cy.get('button[name="create"]').click()
            cy.contains('added')
            cy.get('input[name="author"]').type('abc')
            cy.contains(title)
        })

        it('User can like blog', function () {
            const title = 'Another title'
            const author = 'Some author'
            const blogDisplay = `${title} by ${author}`
            cy.contains('create new blog').click()
            createBlog(title, author, 'Some url')
            cy.contains('view').click()
            cy.get('button[name="like"]').click()
            cy.contains(`${blogDisplay} liked`)
        })

        it('User can remove blog', function () {
            const title = 'Another title'
            const author = 'Some author'
            const blogDisplay = `${title} by ${author}`
            cy.contains('create new blog').click()
            createBlog(title, author, 'Some url')
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.on('window:confirm', () => true)
            cy.contains(`${blogDisplay} removed`)
        })
        it('Blogs are in likes order', function () {
            cy.contains('create new blog').click()

            const blogs = [...Array(5).keys()].map(i => ({
                title: `Title ${i}`,
                author: 'author',
                url: 'https://google.com'
            })).forEach(b =>
                createBlog(b.title, b.author, b.url)
            )
            cy.get('.blog').each(e => {
                cy.wrap(e).within(() => {
                    cy.get('button[name="view"]').click()
                    const likeBtn = cy.get('button[name="like"]')
                    const random = Math.floor(Math.random() * 10);
                    [...Array(random).keys()].forEach(() => likeBtn.click())
                })
            })

            const likes = []
            cy.get('b[name="likes"]').each(e => {
                likes.push(cy.wrap(e).invoke('text'))
            })

            expect(likes).to.equal(likes.sort().reverse())
        })
    })
})