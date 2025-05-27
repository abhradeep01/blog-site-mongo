const errorHandler = (error,req,res,next) =>{
    //error status code
    error.statusCode = error.statusCode || 500;
    //error status
    error.message = error.message || "Internal Server Error";
    //response error status
    return res.status(error.statusCode).json({
        statusCode:error.statusCode,
        message: error.message,
        errorname:error.errorname,
        success: false
    });
}

//export 
export {errorHandler};