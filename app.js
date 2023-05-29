 //const createError = require('http-errors');
import 'dotenv/config.js'
import createError from 'http-errors'
import express from 'express'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger  from 'morgan';
import cors from 'cors';
import {__dirname } from './utils.js';
import indexRouter from'./routes/index.js';

import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'; // es el módulo que permite definir la especificación Swagger utilizando comentarios en el código.

import notFound from './middelwares-m-03/notFound.js';
/*  import trainAI from './chatbotServices.js'   */

// import errorHandler from './middelwares-m-03/errorHandler.js';

import  './config/database.js';
const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//swagger

const swaggerSpec = {  //swaggerSpec: Este objeto contiene la definición de la especificación Swagger. Aquí se establece la información básica de la API, como el título y la versión. También se especifica la URL base de los servidores en los que se ejecutará la API.
  definition: {
    openapi: "3.0.0",  //version de openapi que sigue las convenciones y estructura definidas en la versión 3.0.0 de OpenAPI.
    info: {
      title: "Minga Api",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    security: [     // Esta sección especifica el esquema de seguridad utilizado por la API. En este caso, se define un esquema de seguridad llamado "jwt" que utiliza el formato "bearer" para los tokens JWT.
      {
        jwt: [],
      },
    ],
    components: { // Aquí se definen los componentes utilizados en la especificación Swagger. se define el esquema de seguridad "jwt".
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`], //todos los archivos con .js__dirname se utiliza con path.join() para construir rutas absolutas y evitar problemas relacionados con la resolución de rutas relativas
};



//middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
//swaggerUI.serve:  middleware de Swagger UI que se encarga de servir los archivos estáticos necesarios para la interfaz de Swagger, como los estilos CSS y los scripts JavaScript.
//swaggerUI.setup(swaggerJsDoc(swaggerSpec)): Configura la interfaz de Swagger utilizando los datos de especificación que se generaron previamente con swaggerJsDoc. Esto incluye el título de la documentación, la versión de la API y los endpoints definidos.
app.use("/apidoc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
app.use(notFound)
// app.use(errorHandler)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//train the AI
/*  trainAI.trainChatBotIA();   */
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;