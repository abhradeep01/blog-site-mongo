//error on api
class apiError {
  constructor(error, statusCode) {
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
  class clientError {
    constructor(errorname,message,statusCode){
      this.errorname = errorname;
      this.statusCode = statusCode || 400;
      this.message = message || "Something went wrong!";
      this.success = false;
    }
  }

  //server error
  class serverError {
    constructor(errorname,message,statusCode){
      this.statusCode = statusCode || 500;
      this.message = message || "Internal server error";
      this.errorname = errorname;
      this.success = false ;
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


  export { apiError, notFoundError, serverError, actionError, clientError };