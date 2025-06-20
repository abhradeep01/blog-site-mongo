export default class routeResponse {
    constructor(route,message,statusCode,data,errorname){
        this.route = route;
        this.message = message;
        this.statusCode = statusCode || 200;
        data?this.data = data:null
        this.success = statusCode >= 200 && statusCode < 400 ? true : false;
        errorname?this.errorname = errorname:null
    }
}