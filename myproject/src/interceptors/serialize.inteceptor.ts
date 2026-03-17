import { ExecutionContext, NestInterceptor, CallHandler, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer";

interface ClassConstructer{
    new (...args:any[]): {};
}

export function Serialize(dto: ClassConstructer){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto: any){}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        //before the request is handled by the route handler

        return handler.handle().pipe(
            map((data:any) => {
                // before the response is sent to the client
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        );
    }
}