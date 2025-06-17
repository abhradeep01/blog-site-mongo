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
    constructor(message,errorname,action,statusCode){
      this.statusCode = statusCode || 409;
      this.success = false;
      this.message = message;
      this.errorname = errorname;
      this.action = action;
    }
  }


  export { serverError, actionError, clientError };