const Code = require('@hapi/code')
const Lab = require('@hapi/lab')

const { init } = require('../server')

const { expect } = Code
const { before, describe, it, beforeEach } = exports.lab = Lab.script()

describe('POST /contacts', () => {
    let resp;
    let userToken;
    before(async () => {
        var server = await init();
        const user = { name: 'Matheus', email: 'matheus_martins@gmail.com', password: 'pwd123' }

        await server.inject({
            method: 'POST',
            url: '/user',
            payload: user
        })

        resp = await server.inject({
            method: 'POST',
            url: '/session',
            payload: {
                email: user.email,
                password: user.password
            }
        })

        // console.log(resp.result)

        userToken = resp.result.user_token
    })

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
                payload: contact,
                headers: { 'Authorization': userToken }
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

    describe('quando o contato já existe', () => {

        before(async () => {
            var server = await init();

            let contact = {
                name: 'Saitama',
                number: '31 99993214',
                description: 'One punch man'
            }

            resp = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            })

            resp = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            })
        })

        it('deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        })
    })

    describe('quando não tenho acesso', () => {
        before(async () => {
            var server = await init();
            resp = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: null,
                headers: { 'Authorization': 'abc4e04974b2800c742d2abc' }
            })
        })

        it('deve retornar 401', async () => {
            expect(resp.statusCode).to.equal(401)
        })

    })

    describe('quando o payload é nulo', () => {
        before(async () => {
            var server = await init();
            resp = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: null,
                headers: { 'Authorization': userToken }
            })
        })

        it('deve retornar 400', async () => {
            expect(resp.statusCode).to.equal(400)
        })

    })

    describe('quando o payload não tem os campos preenchidos', () => {
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
            beforeEach(async () => {
                var server = await init()

                resp = await server.inject({
                    method: 'POST',
                    url: '/contacts',
                    payload: value.payload,
                    headers: { 'Authorization': userToken }
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