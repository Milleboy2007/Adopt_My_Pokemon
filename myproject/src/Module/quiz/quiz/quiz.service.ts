import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity'
import { Not } from 'typeorm/browser';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>
    ){}


    createQuiz( titre: string, difficulte: string, recompenseCredits: number   ) {

        const quiz = this.quizRepository.create({titre, difficulte, recompenseCredits});
        return this.quizRepository.save(quiz)

    }

    async findQuizById(id: number) {
        const quiz = await(this.quizRepository.findOneBy({id}))

        if(!quiz) throw new NotFoundException("Quiz not Found");

        return quiz;
        
    }

    async deleteOneQuizById(id: number) {
        const quiz = await(this.quizRepository.findOneBy({id}))
        
        
        if(!quiz) throw new NotFoundException("Quiz not Found");

        
        return this.quizRepository.delete(quiz);

    }

    

}
