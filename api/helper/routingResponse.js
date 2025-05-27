export default class routeResponse {
    constructor(route,message,statusCode,data,errorname){
        this.route = route;
        this.message = message;
        this.statusCode = statusCode || 200;
        this.data = data;
        this.success = statusCode >= 200 && statusCode < 400 ? true : false;
        this.errorname = errorname ;
    }
}