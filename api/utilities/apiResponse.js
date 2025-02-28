class apiresponse {
    constructor(message='success',statusCode,data){
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.success = statusCode >= 200 
    }
}

export {apiresponse}