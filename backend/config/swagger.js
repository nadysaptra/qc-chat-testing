/* eslint-disable no-undef */
const swaggerInitialize = (app) => {
    const expressSwagger = require('express-swagger-generator')(app);

    let options = {
        swaggerDefinition: {
            info: {
                description: 'Qiscus App',
                title: 'Swagger',
                version: '1.0.0',
            },
            host: 'localhost:8000',
            basePath: '/v1',
            produces: [
                "application/json",
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                CUSTOM: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-role',
                    description: "Role of Login user. Ex: customer | agent | supervisor",
                },
            },
        },
        basedir: __dirname, //app absolute path
        files: ['../route/**/*.js'] //Path to the API handle folder
    };
    expressSwagger(options);

};
module.exports = {
    swaggerInitialize
};