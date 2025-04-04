const errorHandler = (error,req,res,next) =>{
    //error status code
    error.statusCode = error.statusCode || 500;
    //error status
    error.status = error.status || "Internal Server Error";
    //response error status
    res.status(error.statusCode).json({
        status:error.statusCode,
        message: error.message,
        errorname:error.name
    });
}

//export 
export {errorHandler};