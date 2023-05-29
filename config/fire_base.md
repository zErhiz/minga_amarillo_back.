# multer y fire base en mi backend.
utilizo Multer y Firebase para guardar las imágenes al crear un manga y al registrarse en nuestra aplicación,
para ello tuve que instalar npm install multer y npm install firebase-admin

## configuracion de multer 
1. instalo el paquete que anteriormente que  nombre (npm install multer)
2. en la configuracion de multer utilizo  multer.memoryStorage para almacenar los archivos en memoria en lugar de guardarlos en el disco
3. utilizando el objeto storage y se configuran los límites de tamaño del archivo y el filtro de tipo de archivo.
4. define el middleware de multer utilizando el método single('photo'), lo que indica que se espera un solo archivo en la solicitud con el nombre de campo "photo" y "cover_photo" para la creacion de un manga  .
5. por ultimo exporto el middleware

### configuracion de firebase
1. instalo el paquete que anteriormente que  nombre ( npm install firebase-admin)
2. en la configuracion de firebase-admin y utiliza un archivo de servicio firebase.json para la configuración 
3. BUCKET representa el nombre del bucket de almacenamiento en Firebase.
4. uploadimg  se utiliza para cargar una imagen. Verifica si hay un archivo adjunto en la solicitud (req.file).
si hay crea un nombre único para el archivo basado en la marca de tiempo
5. Cuando la escritura se completa correctamente, el archivo se hace público y se asigna una URL de acceso público (req.file.firebaseurl) que se compone utilizando la URL base del bucket y el nombre del archivo.

