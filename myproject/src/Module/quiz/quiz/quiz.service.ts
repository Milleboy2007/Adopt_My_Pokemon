import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity'
import { Not } from 'typeorm/browser';
import { questionsData, Difficulte } from '../data/questions.data';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>
    ){}
    getRandomQuestions(difficulte: Difficulte, numberOfQuestions: number) {
            const questions = questionsData[difficulte];
            if (!questions) {
                throw new BadRequestException("Difficulté invalide");
            }
            // 0.5 pour me mélanger les questions, 
            // et slice pour prendre que le nombre de question demandé
            const shuffled = questions.slice().sort(() => 0.5 - Math.random());
            
            // Si le nombre de questions demandé est supérieur au nombre de questions disponibles, 
            // on retourne toutes les questions mélangées
            return shuffled.slice(0, numberOfQuestions);
    }


    createQuiz(titre: string, difficulte: string, recompenseCredits: number, nombreDeQuestions: number) {
    
        const quiz = this.quizRepository.create({titre, difficulte, recompenseCredits, nombreDeQuestions});
    
        return this.quizRepository.save(quiz);
  }

    async findQuizById(id: number) {
        const quiz = await(this.quizRepository.findOneBy({id}))

        if(!quiz) throw new NotFoundException("Quiz not Found");

        // Récupérer les questions aléatoires en fonction de la difficulté 
        // et du nombre de questions du quiz
        const questions = this.getRandomQuestions(quiz.difficulte as Difficulte, quiz.nombreDeQuestions);

        return {quiz, questions};
        
    }

    async deleteOneQuizById(id: number) {
        const quiz = await(this.quizRepository.findOneBy({id}))
        
        
        if(!quiz) throw new NotFoundException("Quiz not Found");

        
        return this.quizRepository.delete(quiz);

    }

    async findAllQuiz() {
        const quizzes = await this.quizRepository.find();
         
        if(quizzes.length === 0) throw new NotFoundException("No Quiz Found");

        return quizzes;
    }
    
    

}
