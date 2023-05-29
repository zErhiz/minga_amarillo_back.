1-Por el lado del BACKEND lo primero que debemos hacer es instalar las dependencias de mercado pago con npm install mercadopago

2- Luego debemos configurar nuestro controlador de donaciones de mercado pago. En el controlador debemos importar mercado pago y agregar las credenciales con el comando mercadopago.configure y nuestro access token, el cual sólo lo debemos tener nosotros y debe estar guardado en nuestro archivo .env

3- En nuestro controlador, debemos declarar una funcion asincrona que contendrá la preferencia que debemos crear. La preferencia es un array con objetos con propiedades. Luego creamos una promesa mercadopago.preferences (dentro de la misma función), en la que tendremos que asignar el valor dentro de response.body.id por el id de preferencia

4-Por último, configuramos las rutas y las establecemos en el enrutador principal, y de esta forma nuestro BACKEND quedaría configurado para utilizar la API MERCADO PAGO.
