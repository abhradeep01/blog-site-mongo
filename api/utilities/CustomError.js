//error on api
class apiError {
  constructor(message = "something went wrong", statusCode, errors = []) {
    // super(message); // Call the parent Error constructor
    this.statusCode = statusCode < 500 && statusCode >= 400 ? statusCode : 400;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}


  //not found error
  class notFoundError extends Error{
    constructor(error,message,){
      super(message);
      this.errorName = error.name;
      this.message = error.message || `('${error.value._id}') string value not found!` ;
      this.statusCode = error.statusCode || 404;
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
  


  export { apiError, notFoundError, serverError };