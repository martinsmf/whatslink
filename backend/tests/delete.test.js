const Code = require('@hapi/code')
const Lab = require('@hapi/lab')

const { init } = require('../server')

const { expect } = Code
const { before, describe, it, beforeEach } = exports.lab = Lab.script()

describe('DELETE /contacts', () => {
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
                payload: contact
            })

            contactId = resp.result._id
        })

        it('quando eu apago esse contato', async () => {
            resp = await server.inject({
                method: 'delete',
                url: `/contacts/${contactId}`
            })
        })

        it('deve retornar 204', () => {
            expect(resp.statusCode).to.equal(204)
        })
    })
})