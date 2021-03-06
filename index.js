'use strict'

const Hapi = require('hapi');
const handlerbars = require('./lib/helpers')
const inert = require('inert')
const path = require('path');
const vision = require('vision')
const routes = require('./routes')
const site = require('./controllers/site')
const methods = require('./lib/methods')


const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    }
})

async function init() {
    try {
        await server.register(inert)
        await server.register(vision)

        server.method('setAnswerRight', methods.setAnswerRight)

        server.state('user', {
            ttl: 1000 * 60 * 60 * 24 * 7,
            isSecure: process.env.NODE_ENV === 'prod',
            encoding: 'base64json'
        })

        server.views({
            engines: {
                hbs: handlerbars
            },
            relativeTo: __dirname,
            path: 'views',
            layout: true,
            layoutPath: 'views'
        })

        server.ext('onPreResponse', site.fileNotFound)
        server.route(routes);

        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1);
    }

    console.log(`Servidor lanzado en: ${server.info.uri}`)
}

process.on('unhandledRejection', error => {
    console.error('UnhandleRejection', error.message, error)
})

process.on('unhandleException', error => {
    console.error('UnhandleException', error.message, error)
})

init();