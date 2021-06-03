'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose') //importa o framework mongoose

const mongoURL = 'mongodb+srv://whatslinkDb:devtester@cluster0.ars9l.mongodb.net/zaplinkdb?retryWrites=true&w=majority'

//conecta no banco
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })

//valida se a conexão foi bem sucedia
mongoose.connection.on('connected', () => {
    console.log('MongoDB connection')
})

//valida se a conexão falhou
mongoose.connection.on('error', (error) => {
    console.log('MongoDB error' + error)
})

const contactRoutes = require('./routes/contact.routes')

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ['http://localhost:8080']
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return {
            message: "Welcome to WhastLink API - DevTester"
        }
    }
});

server.route(contactRoutes)

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running on %s', server.info.uri)
});
console.log('Server running on %s', server.info.uri);

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

exports.init = async () => {
    return server;
};