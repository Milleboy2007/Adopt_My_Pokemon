import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AdoptionModule } from './Module/adoption/adoption.module';
import { Adoption } from './Module/adoption/entities/adoption.entity';
import { Formulaire } from './Module/adoption/entities/formulaire.entity';
import { Pokemon } from './Module/pokemon/entities/pokemon.entity';

@Module({
  imports: [UsersModule, ReportsModule, AdoptionModule, TypeOrmModule.forRoot(
    {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Adoption, Formulaire, Pokemon],
      synchronize: true
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
