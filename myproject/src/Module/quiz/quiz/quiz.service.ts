import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity'

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>
    ){}


    createQuiz( titre: string, recompenseCredits: number, difficulte: string[] ) {

        const quiz = this.quizRepository.create({titre, recompenseCredits, difficulte});
        return this.quizRepository.save(quiz)

    }

    

}
