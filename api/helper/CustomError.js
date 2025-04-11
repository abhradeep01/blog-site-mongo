//error on api
class apiError {
  constructor(error, statusCode) {
    // super(error); // Call the parent Error constructor
    this.statusCode = statusCode < 500 && statusCode >= 400 ? statusCode : 400;
    this.message = error.message;
    this.success = false;
    this.errorname = error.name;
  }
}


  //not found error
  class notFoundError extends Error{
    constructor(error,message,){
      super(message);
      this.errorName = error.name || "ServerError";
      this.message = error.message || "Internal server error";
      this.statusCode = error.statusCode || 500;
      this.success = false;
    }
  }


  //client error
  class clientError extends Error{
    constructor(error,message){

    }
  }

  //server error
  class serverError extends Error{
    constructor(error,message){
      super(message)
      this.statusCode = error.statusCode >= 500 ? error.statusCode : 500;
      this.message = error.message
    }
  }
  
  //action error
  class actionError {
    constructor(message,name,action,statusCode){
      this.statusCode = statusCode || 409;
      this.success = false;
      this.message = message;
      this.errorname = name;
      this.action = action;
    }
  }


  export { apiError, notFoundError, serverError, actionError };