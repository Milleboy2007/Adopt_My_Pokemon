import { CanActivate, ExecutionContext } from "@nestjs/common";

export class SuperAdmAuthGuard implements CanActivate{

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        return request.currentUser.permLvl === 3;
    }
}