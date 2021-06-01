const Code = require('@hapi/code')
const Lab = require('@hapi/lab')

const { init } = require('../server')

const { expect } = Code
const { before, describe, it } = exports.lab = Lab.script()

describe('POST /contacts', () => {
    let resp;

    describe('quando realizo uma requisição post', () => {

        before(async () => {
            var server = await init();

            let contact = {
                name: 'Frank',
                number: '31 9999999',
                description: 'Carpinteiro'
            }

            resp = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact
            })
        })

        it('deve retornar 200', async () => {
            expect(resp.statusCode).to.equal(200)
        })

        it('deve retornar o id', async () => {
            var res = resp.result
            expect(res._id).to.be.a.object()
            expect(res._id.toString().length).to.equal(24)
        })
    })

    describe('quando o payload é nulo', () => {
        before(async () => {
            var server = await init();
            resp = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: null
            })
        })

        it('deve retornar 400', async () => {
            expect(resp.statusCode).to.equal(400)
        })

    })

    describe.only('quando o payload não tem os campos preenchidos', () => {
        let contact = [
            {
                payload: {
                    number: '31 9999999',
                    description: 'Carpinteiro'
                },
                message: 'Name is required',
            },
            {
                payload: {
                    name: '',
                    number: '31 9999999',
                    description: 'Carpinteiro'
                },
                message: 'Name is required',
            },
            {
                payload: {
                    name: 'Frank',
                    description: 'Carpinteiro'
                },
                message: 'Number is required',
            },
            {

                payload: {
                    name: 'Frank',
                    number: '31 9999999'
                },
                message: 'Description is required'
            }
        ]
        contact.forEach((value, key) => {
            before(async () => {
                var server = await init()

                resp = await server.inject({
                    method: 'POST',
                    url: '/contacts',
                    payload: value.payload
                })
            })

            it('deve retornar 409', async () => {
                console.log(value)
                var teste = resp.result.message
                console.log(teste)
                expect(resp.statusCode).to.equal(409)
            })

            // it(`deve retornar a mensagem: ${value.message}`, async () => {
            //     expect(resp.result.message).to.equal(value.message)
            // })

        })
    })
})