const Code = require('@hapi/code')
const Lab = require('@hapi/lab')

const { init } = require('../server')

const { expect } = Code
const { before, describe, it, beforeEach } = exports.lab = Lab.script()

describe('DELETE /contacts', () => {
    let resp;
    let userToekn;

    before(async () => {
        var serve = await init();
        const user = { name: 'Gabriellen', email: 'gabriellen@gmail.com', password: 'pwd123' }

        await serve.inject({
            method: 'POST',
            url: '/user',
            payload: user
        })

        resp = await serve.inject({
            method: 'POST',
            url: '/session',
            payload: {
                email: user.email,
                password: user.password
            }
        })

        userToekn = resp.result.user_token
    })

    describe('dado que eu tenho um contato indesejado', () => {
        const contact = {
            name: 'Claro',
            number: '31 77553 1144',
            description: 'Operadora'
        }

        let server, resp, contactId

        before(async () => {
            server = await init()

            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToekn }
            })

            contactId = resp.result._id
        })

        it('quando eu apago esse contato', async () => {
            resp = await server.inject({
                method: 'delete',
                url: `/contacts/${contactId}`,
                headers: { 'Authorization': userToekn }
            })
        })

        it('deve retornar 204', () => {
            expect(resp.statusCode).to.equal(204)
        })
    })

    describe('dado que não tenho acesso', () => {
        const contact = {
            name: 'Claro',
            number: '31 77553 1144',
            description: 'Operadora'
        }

        let server, resp, contactId

        before(async () => {
            server = await init()

            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToekn }
            })

            contactId = resp.result._id
        })

        it('quando tento apago esse contato', async () => {
            resp = await server.inject({
                method: 'delete',
                url: `/contacts/${contactId}`,
                headers: { 'Authorization': 'abc4e04974b2800c742d2abc' }
            })
        })

        it('deve retornar 401', () => {
            expect(resp.statusCode).to.equal(401)
        })
    })

})