const Joi = require('joi')
const site = require('./controllers/site')
const users = require('./controllers/users')
const question = require('./controllers/questions')

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
                },
                failAction: users.failValidation
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
        path: '/question/{id}',
        handler: site.viewQuestions
    },
    {
        method: 'GET',
        path: '/logout',
        handler: users.logout
    },
    {
        method: 'GET',
        path: '/ask',
        handler: site.ask
    },
    {
        method: 'POST',
        path: '/validate-user',
        options: {
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(6)
                },
                failAction: users.failValidation
            }
        },
        handler: users.validateUser
    },
    {
        method: 'POST',
        path: '/create-question',
        options: {
            validate: {
                payload: {
                    title: Joi.string().required(),
                    description: Joi.string().required()
                },
                failAction: users.failValidation
            }
        },
        handler: question.createQuestion
    },
    {
        method: 'POST',
        path: '/answer-question',
        options: {
            validate: {
                payload: {
                    answer: Joi.string().required(),
                    id: Joi.string().required()
                },
                failAction: users.failValidation
            }
        },
        handler: question.answerQuestion
    },
    {
        method: 'GET',
        path: '/answer/{questionId}/{answerId}',
        handler: question.setAnswerRight
    },
    {
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['indexx.html']
            }
        }
    },
    {
        method: ['GET', 'POST'],
        path: '/{any*}',
        handler: site.notFound
    }
]