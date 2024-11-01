const express = require('express');
const routerUsuarios = require('./routes/usuarios.routes');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const mongo = require('./data/mongo.data');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json());


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Grupo GASON',
    version: '1.0.0',
    description:
      'Api de prueba grupo GASON.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};


const options = {
  swaggerDefinition,
  apis: ['./routes/*.routes.js'],
};


const swaggerSpec = swaggerJSDoc(options);  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas añadidas
app.use('/usuarios', routerUsuarios);
app.use('**', (req, res) =>  {
  res.send(JSON.stringify({ description: 'metodo no encontrado' })); // No encontrado
});

app.use(function(err, req, res, next) { // Errores
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app