describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', {
            username: 'name', password: 'pass', name: 'test-name'
        })
        // create here a user to backend
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('name')
            cy.get('#password').type('pass')
            cy.get('#login-button').click()
            cy.contains('test-name logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('fail')
            cy.get('#password').type('fail')
            cy.get('#login-button').click()
            cy.contains('wrong credentials')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({username: 'name', password: 'pass'})
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#titleInput').type('title of blog')
            cy.get('#authorInput').type('i am author')
            cy.get('#urlInput').type('www.blog.com')
            cy.contains('save').click()
            cy.contains('title of blog i am author')
        })
    })

    describe.only('blog can be liked', function () {
        beforeEach(function () {
            cy.login({username: 'name', password: 'pass'})
            cy.createBlog({
                title: 'this is title',
                author: 'this is author',
                url: 'this is url'
            })
        })

        it('A blog can be liked', function () {
            cy.contains('this is title this is author')
            cy.contains('view').click()
            cy.contains('Likes: 0')
            cy.contains('like').click()
            cy.contains('Likes: 1')
            cy.contains('like').click()
            cy.contains('Likes: 2')
        })

        it('A blog can be deleted', function () {
            cy.contains('this is title this is author')
            cy.contains('view').click()
            cy.contains('delete').click()
            cy.contains('successfully removed blog!')
            cy.get('html').should('not.contain', 'this is title this is author')
        })
    })
})