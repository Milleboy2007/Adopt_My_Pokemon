import { Module } from '@nestjs/common';
import { QuizController } from './quiz/quiz.controller';
import { QuizService } from './quiz/quiz.service';
import { QuizService } from './quiz/quiz.service';
import { QuizController } from './quiz/quiz.controller';

@Module({
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
