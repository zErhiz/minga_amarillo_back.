Implementación de la API de Swagger y la ruta /apidoc
La implementación de la API de Swagger es una práctica común para documentar y visualizar una API en un proyecto. Proporciona una interfaz intuitiva y fácil de usar para explorar, probar y comprender los endpoints de la API de manera eficiente.

En este documento, aprenderás cómo implementar la API de Swagger en tu proyecto y cómo acceder a la documentación de la API a través de la ruta /apidoc. Esta ruta te permitirá utilizar Swagger UI, una herramienta que te brinda una interfaz interactiva para explorar y comprender fácilmente los diferentes endpoints de tu API, así como acceder a documentación detallada sobre cada uno de ellos.

Además, se proporcionan distintos scripts para ejecutar pruebas automatizadas en tu API. Estos scripts te permiten probar diferentes aspectos de la API, como los recursos, las autenticaciones y otros casos de uso relevantes. Cada script está diseñado para ejecutar pruebas específicas y ayudarte a garantizar el correcto funcionamiento de tu API.

¡Sigue las instrucciones proporcionadas en este documento para implementar la API de Swagger en tu proyecto y acceder fácilmente a la documentación de tu API a través de la ruta /apidoc!

La implementación de la API de Swagger es una excelente manera de documentar y visualizar una API en tu proyecto. Proporciona una interfaz intuitiva y fácil de usar para explorar y probar los endpoints de la API.
instalación de dependencias:  npm install swagger-ui-express swagger-jsdoc --save-dev


## configuracion en app.js configuramos swagger con esto y importamos lo que necesitamos 
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc';
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
y definimos la ruta app.use("/apidoc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
Como accedo a swagger: accedo a esta documentacion de la api entrando a esta ruta http://localhost:8000/apidoc/ 
En resumen, al acceder a la ruta /apidoc de tu API, podrás utilizar Swagger UI para explorar, probar y comprender fácilmente todos los endpoints de tu API, así como ver la documentación detallada de cada uno de ellos.

luego para usarlo llamamos a swagger @swagger  y para hacer un esquema le definimos el schema con el componente
/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the author
 *         last_name:
 *           type: string
 *           description: The last name of the author
 *         city:
 *           type: string
 *           description: The city where the author resides
 *         country:
 *           type: string
 *           description: The country where the author resides
 *         date:
 *           type: string
 *           format: date
 *           description: The date of birth of the author
 *         photo:
 *           type: string
 *           description: The URL of the author's photo
 *         active:
 *           type: boolean
 *           description: Indicates if the author is active
 *         user_id:
 *           type: string
 *           description: The ID of the associated user
 *       required:
 *         - name
 *         - city
 *         - country
 *         - photo
 *         - active
 *         - user_id
 *       example:
 *         name: zenitsu
 *         last_name: noyaiba
 *         city: Town
 *         country: China
 *         date: 1990-01-01
 *         photo: https://example.com/photo.jpg
 *         active: false
 *         user_id: 1234567892132
 */
luego para configurar una ruta hacemos lo siguiente 
 * @swagger 
 * /api/categories:
 *  get:
 *      summary: return all categories
 *      tags:
 *        - Categories
 *      responses:
 *          200:    
 *              description: all categories
 *              content:    
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/Categories' //componente que definimos anteriormente
 *          400:
 *              description: categories not found or something went wrong
 */
ademas defini distintos scripts que ejecutan distintos test 
    "test": "mocha", (ejecuta todos los test)
    "test:category": "mocha ./test/category.test.js", (ejecuta el test de el recurso category)
    "test:auth": "mocha ./test/auth.test.js", (ejecuta el test de la ruta auth tener en cuenta que adentro ahi un test de el endpoint signup que ahi que cambiarle el email para que no tire error por si ahi otro usuario con el mismo email)
    "test:authors": "mocha ./test/accesToken.test.js ./test/testHelper.test.js  ./test/authors.test.js", (ejecuta el test del recurso authors tener en cuenta que ahi un test que en accesToken ahi que cambiar a un usuario que no tenga un autor ya creado o que no sea un autor, si no tira error por que justamente ese test es para crear un autor en base a ese usuario de accesToken)
    "test:chapter": "mocha ./test/accesToken.test.js ./test/testHelper.test.js ./test/chapter.test.js", (ejecuta el test del recurso chapters tener en cuenta que ahi que logearse con el mail de un author que tenga chapters)
    "test:comments": "mocha ./test/accesToken.test.js ./test/testHelper.test.js ./test/comments.test.js", (ejecuta el test del recurso comments que trae todos los comentarios )
    "test:companies": "mocha ./test/accesToken.test.js ./test/testHelper.test.js ./test/companies.test.js",(ejecuta el test del recurso companies que obtiene las companias activas e inactivas)
    "test:mangas": "mocha ./test/accesToken.test.js ./test/testHelper.test.js ./test/mangas.test.js "(ejecuta el test del recurso mangas tener en cuenta estar logeado con un autor con mangas)