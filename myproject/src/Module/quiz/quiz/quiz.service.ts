import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { questionsData, Difficulte } from '../data/questions.data';
import { UsersService } from 'src/Module/users/services/users.service';
import { diff } from 'node:util';



@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
        private userService: UsersService
    ){}

    // Map pour stocker les questions déjà utilisées pour chaque utilisateur 
    // et chaque nombre de questions
    private usedQuestions= new Map<string, Set<number>>();

    getRandomQuestions(difficulte: Difficulte, numberOfQuestions: number, userId: number) {
            const questions = questionsData[difficulte];
            if (!questions) {
                throw new BadRequestException("Difficulté invalide");
            }

            const cle = `${userId}-${difficulte}`

            // Si toutes les questions ont été vues, on reset
            if (!this.usedQuestions.has(cle) || (this.usedQuestions.get(cle)?.size ?? 0) >= questions.length) {
                this.usedQuestions.set(cle, new Set());
            }

            const utiliser = this.usedQuestions.get(cle)!; // pour dire a Ts que c pas undefined

            const questionDispo = questions
                .map ((q, index) => ({...q, index}))
                .filter(q => !utiliser.has(q.index));
            

            // 0.5 pour me mélanger les questions, 
            // et slice pour prendre que le nombre de question demandé
            const shuffled = questionDispo.slice().sort(() => 0.5 - Math.random());
            
            // Si le nombre de questions demandé est supérieur au nombre de questions disponibles, 
            // on retourne toutes les questions mélangées
            const choisi =  shuffled.slice(0, numberOfQuestions);

            choisi.forEach(q => utiliser.add(q.index));

            return choisi.map(q => q);
    }


    createQuiz(titre: string, difficulte: string, recompenseCredits: number, nombreDeQuestions: number) {
    
        const quiz = this.quizRepository.create({titre, difficulte, recompenseCredits, nombreDeQuestions});
    
        return this.quizRepository.save(quiz);
  }

    async findQuizById(id: number, userId: number) {
        const quiz = await(this.quizRepository.findOneBy({id}))

        if(!quiz) throw new NotFoundException("Quiz not Found");


        const user = await this.userService.findUser(userId);
        const aujourdhui = new Date().toLocaleDateString('fr-CA'); // "2026-05-06"
        
        
        const dernierQuiz = {
            'EASY': user.lastEasyQuiz,
            'MEDIUM': user.lastMediumQuiz,
            'HARD': user.lastHardQuiz
        }

        if (dernierQuiz[quiz.difficulte as Difficulte] === aujourdhui) {
            throw new BadRequestException("Vous avez déjà fait ce quiz aujourd'hui, revenez demain !");
        }
        
        // Récupérer les questions aléatoires en fonction de la difficulté 
        // et du nombre de questions du quiz
        const questions = this.getRandomQuestions(quiz.difficulte as Difficulte, quiz.nombreDeQuestions, userId);

        return {quiz, questions};
        
    }

    async deleteOneQuizById(id: number) {
        const quiz = await this.quizRepository.findOneBy({id})
        
        
        if(!quiz) throw new NotFoundException("Quiz not Found");

        
        return this.quizRepository.delete(quiz);

    }

    async findAllQuiz() {
        const quizzes = await this.quizRepository.find();

        return quizzes;
    }
    
    async addRecompenseCredits(userId: number, credits: number, difficulte: string) {
        const user = await this.userService.findUser(userId);
        const aujourdhui = new Date().toLocaleDateString('fr-CA'); // "2026-05-06"
        

        const newCredits = user.pokecred + credits;

        const colonneParDifficulte = {
            'EASY': 'lastEasyQuiz',
            'MEDIUM': 'lastMediumQuiz',
            'HARD': 'lastHardQuiz'
        }

        await this.userService.updateUser(userId, 
            {[colonneParDifficulte[difficulte]]: aujourdhui});
        console.log('difficulte reçue:', difficulte)
        console.log('colonne:', colonneParDifficulte[difficulte])

        return newCredits;

    }
    

}
