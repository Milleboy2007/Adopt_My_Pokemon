import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AdmAuthGuard implements CanActivate{

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        return request.currentUser.permLvl >= 2;
    }
}