import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './services/auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService],
  controllers: [UsersController, AuthController]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
