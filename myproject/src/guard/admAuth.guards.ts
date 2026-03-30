import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Admin } from "src/Module/users/entities/admin.entity";

export class AdmAuthGuard implements CanActivate{

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        return request.currentUser instanceof Admin;
    }
}