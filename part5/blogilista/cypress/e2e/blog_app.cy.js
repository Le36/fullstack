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
})