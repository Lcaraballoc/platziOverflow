const Joi = require('joi')
const site = require('./controllers/site')
const users = require('./controllers/users')

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: site.home
    },
    {
        method: 'GET',
        path: '/register',
        handler: site.register
    },
    {
        method: 'POST',
        path: '/create-user',
        options: {
            validate: {
                payload: {
                    name: Joi.string().required().min(3),
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(6)
                }
            }
        },
        handler: users.createUser
    },
    {
        method: 'GET',
        path: '/login',
        handler: site.login
    },
    {
        method: 'GET',
        path: '/logout',
        handler: users.logout
    },
    {
        method: 'POST',
        path: '/validate-user',
        options: {
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(6)
                }
            }
        },
        handler: users.validateUser
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
    }
]