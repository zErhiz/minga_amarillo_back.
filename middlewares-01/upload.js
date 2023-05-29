import multer from "multer";
//el parametro file tiene toda la info de la imagen.


function upload() {
  const storage = multer.memoryStorage({ 
    destination: './public/imgs',
    filename: function (req, file, cb) {
      let extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
        //lastIndexOf encuentra el ultimo punto del nombre original
        //con el metodo slice corto el nombre a partir de la posicion encontrada por el lastIndexOf
      let filename = Date.now() + extension;
      //Date.now() es para que se guarde la fecha exacta en la que se subió la imagen, sirve para diferenciar otros archivos que pueda subirse con el mismo nombre
      cb(null, filename);
    }
  });

  const upload = multer({ storage, 
    limits:{fileSize: 10000000},
    fileFilter: function(req, file, cb) {
      let type = file.mimetype.startsWith('image/');
      type?cb(null, true):cb(new Error ('No es un archivo de tipo imagen'))
      }
    }
  ).single('photo');
  return upload;
}


export default upload 