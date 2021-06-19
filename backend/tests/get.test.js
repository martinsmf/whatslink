const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server')

const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('GET /contacts', () => {

    let contacts
    let userToekn

    before(async () => {
        var serve = await init()
        const user = { name: 'Zoro', email: 'roronoa@onepiece.com', password: 'pwd123' }

        await serve.inject({
            method: 'POST',
            url: '/user',
            payload: user
        })

        var resp = await serve.inject({
            method: 'POST',
            url: '/session',
            payload: {
                email: user.email,
                password: user.password
            }
        })

        userToekn = resp.result.user_token
    })

    before(async () => {
        var server = await init()

        contacts = await server.inject({
            method: 'GET',
            url: '/contacts',
            headers: { 'Authorization': userToekn }
        })
    })

    it('deve retornar 200', async () => {
        expect(contacts.statusCode).to.equal(200)
    })

    it('deve retornar uma lista', async () => {
        expect(contacts.result).to.be.array()
    })
})