import { ExecutionContext, NestInterceptor, CallHandler, UseInterceptors, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../services/users.service";

interface ClassConstructer{
    new (...args:any[]): {};
}

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{

    constructor(private usersService: UsersService){}

    async intercept(context: ExecutionContext, handler: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const userId = request.session.userId;
        if (userId){
            const user = await this.usersService.findUser(userId);
            request.currentUser = user;
        }
        return handler.handle();
    }
}