class apiresponse {
    constructor(message='success',statusCode,data){
        this.message = message;
        this.statusCode = statusCode;
        this.success = statusCode >= 200 ;
        this.data = data;
    }
}

export {apiresponse}