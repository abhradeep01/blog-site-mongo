class apiError extends Error{
    constructor(
        statusCode,message="something went wrong",
        errors=[],stack=""
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.success = false;
        this.errors = errors;
        this.stack = stack;
    }
}

export {apiError};