const errorHandler =(err,req,res,next)=>{
console.log(err.stack);
return res
.satus(err.satus || 500)
.json({
    statusCode:err.satus,
    menssage:err.menssage
})
}
export default errorHandler