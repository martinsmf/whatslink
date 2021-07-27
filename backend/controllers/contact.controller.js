const ContactModel = require('../models/contact.model')
const UserModel = require('../models/user.model')

const auth = {
    verify: async (userId) => {
        const foundUser = await UserModel.findById(userId)
        if (!foundUser)
            throw { error: 'Unauthorized', code: 401 }
    }
}

module.exports = {

    async register(request, h) {
        console.log(request.payload)
        console.log(request.headers.authorization)

        const userId = request.headers.authorization

        try {
            const verify = auth['verify']
            await verify(userId)
        } catch (error) {
            return h.response(error).code(error.code)
        }

        if (request.payload === null)
            return h.response({ message: 'Not JSON' }).code(400)


        const contact = new ContactModel({
            name: request.payload.name,
            number: request.payload.number,
            description: request.payload.description,
            userId: userId
        })

        if (!contact.name)
            return h.response({ message: 'Name is required' }).code(409)

        if (!contact.number)
            return h.response({ message: 'Number is required' }).code(409)

        if (!contact.description)
            return h.response({ message: 'Description is required' }).code(409)

        let dup = await ContactModel.findOne({ number: contact.number, userId: userId }).exec();

        if (dup)
            return h.response({ error: 'Duplicated number.' }).code(409)

        try {
            let result = await contact.save()
            return h.response(result).code(200);
        } catch (error) {
            return h.response(error).code(500)
        }

    },
    async remove(request, h) {
        const userId = request.headers.authorization

        try {
            const verify = auth['verify']
            await verify(userId)
        } catch (error) {
            return h.response(error).code(error.code)
        }

        try {
            const user = await ContactModel.findOne({ _id: request.params.contactId, userId: userId })

            if (!user)
                return h.response({}).code(404)

            await ContactModel.deleteOne({ _id: request.params.contactId, userId: userId })
            return h.response({}).code(204)
        } catch (error) {
            return h.response(error).code(500)
        }
    },
    async list(request, h) {

        const userId = request.headers.authorization

        try {
            const verify = auth['verify']
            await verify(userId)
        } catch (error) {
            return h.response(error).code(error.code)
        }

        const contacts = await ContactModel.find({ userId: userId }).exec()
        return contacts
    }
}