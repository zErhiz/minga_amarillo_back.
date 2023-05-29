const  admin = require("firebase-admin");

const serviceAccount = require("../firebase.json");
//accedo a mi proyecto
const BUCKET='francisco-46.appspot.com'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket : BUCKET
});

const bucket =admin.storage().bucket()

const uploadImg=(req,res,next)=>{
    if (!req.file) return next()

    const image=req.file
    const nameFile=Date.now()+"."+image.originalname.split(".").pop() //extencion del archivo

    //nueva r
    const file =bucket.file(nameFile)
    
    const stream=file.createWriteStream({
        metadata:{
            contentType:image.mimeType,
        }
    })
    stream.on("error",(e)=>{
        console.log(e);
    })
    stream.on("finish",async (e)=>{
        await file.makePublic()


        req.file.firebaseurl=`http://storage.googleapis.com/${BUCKET}/${nameFile}`
       next()
    })
    
    
    stream.end(image.buffer)
    
}

module.exports= uploadImg

