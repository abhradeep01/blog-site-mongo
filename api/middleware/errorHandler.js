const errorHandler = (error,req,res,next) =>{
    //error status code
    error.statusCode = error.statusCode || 500;
    //error status
    error.status = error.status || "error";
    //response error status
    res.status(error.status).json({
        status:error.statusCode,
        message: error.message
    });
}

//export 
export default {errorHandler};