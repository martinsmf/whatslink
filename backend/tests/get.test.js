const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server')

const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('GET /contacts', () => {

    let contacts

    before(async () => {
        var server = await init()

        contacts = await server.inject({
            method: 'GET',
            url: '/contacts'
        })
    })

    it('deve retornar 200', async () => {
        expect(contacts.statusCode).to.equal(200)
    })

    it('deve retornar uma lista', async () => {
        expect(contacts.result).to.be.array()
    })

    it('deve retornar matheus', async () => {
        var res = contacts.result[0]
        expect(res.name).to.contains('Matheus Martins')
    })
})