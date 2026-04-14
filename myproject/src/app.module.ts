import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Module/users/user.entity';
import { AdoptionModule } from './Module/adoption/adoption.module';
import { PokemonModule } from './Module/pokemon/pokemon.module';
import { QuizModule } from './Module/quiz/quiz.module';

@Module({
  imports: [UsersModule, AdoptionModule, PokemonModule, QuizModule, TypeOrmModule.forRoot(
    {
      type: 'sqlite',
      database: 'db.sqlite',
      //entities: [User],
      autoLoadEntities: true,
      synchronize: true
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
