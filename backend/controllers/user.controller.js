const UserModel = require('../models/user.model')
const md5 = require('md5')
module.exports = {
    async create(request, h) {
        if (request.payload === null)
            return h.response({ message: 'Not JSON' }).code(400)

        if (!request.payload.name)
            return h.response({ message: 'Name is required.' })

        if (!request.payload.email)
            return h.response({ message: 'Email is required.' }).code(409)

        if (!request.payload.password)
            return h.response({ message: 'Password is required.' }).code(409)

        const user = new UserModel({
            name: request.payload.name,
            email: request.payload.email,
            password: md5(request.payload.password)
        })

        const dup = await UserModel.findOne({ email: user.email }).exec()

        if (dup)
            return h.response({ error: 'Duplicated email.' }).code(409)

        try {
            let result = await user.save()
            let cipher = {
                userId: result._id,
                name: result.name,
                email: result.email.replace(/([A-z]|[0-9])([A-z]|[0-9])([A-z]|[0-9])/, '***'),
                password: result.password
            }
            return h.response(cipher).code(200)
        } catch (error) {
            return h.response(error).code(500)
        }
    },

    async login(request, h) {

        if (request.payload === null)
            return h.response({ message: 'Not JSON' })

        const { email, password } = request.payload

        try {
            const user = await UserModel.findOne({ email: email, password: md5(password) }).exec()

            if (!user)
                return h.response({ error: 'Usuário ou senha inválidos' }).code(401)

            return h.response({ user_token: user._id, name: user.name }).code(200)
        } catch (error) {
            return h.response(error).code(500)
        }
    }
}