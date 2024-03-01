import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppService } from "../app.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private app: AppService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        var key: string = '';

        if(this.app.utilities.getUserToken()){
            key = this.app.utilities.getUserToken()
        }

        if(key){
            req = req.clone({
                setHeaders:{
                    'Authorization': `Bearer ${key}`
                }
            });
        }
        return next.handle(req)
    }
}