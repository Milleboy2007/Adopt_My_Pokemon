import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Module/users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Module/users/user.entity';

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule.forRoot(
    {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
