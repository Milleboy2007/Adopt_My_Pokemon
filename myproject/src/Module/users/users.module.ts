import { Module } from '@nestjs/common';
import { AbstractUserController } from './abstract-user/abstract-user.controller';
import { ClientController } from './client/client.controller';
import { AdminController } from './admin/admin.controller';
import { AbstractUserService } from './abstract-user/abstract-user.service';
import { ClientService } from './client/client.service';
import { AdminService } from './admin/admin.service';
import { AuthentificationService } from './authentification/authentification.service';

@Module({
  controllers: [AbstractUserController, ClientController, AdminController],
  providers: [AbstractUserService, ClientService, AdminService, AuthentificationService]
})
export class UsersModule {}
