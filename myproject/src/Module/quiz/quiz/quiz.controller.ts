import { Body, Controller, Param, ParseIntPipe, Post, UseGuards, Get } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AdmAuthGuard } from 'src/guard/admAuth.guards';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { AUTH } from 'sqlite3';
import { AuthGuard } from 'src/guard/auth.guard';
import { Difficulte } from '../data/questions.data';

@Controller('quiz')
export class QuizController {
    constructor (
        private quizService: QuizService
    ) {}

    @UseGuards(AdmAuthGuard)
    @Post('/create')
    CreateQuiz(@Body() body: CreateQuizDto) {
    return this.quizService.createQuiz(body.titre, body.difficulte, body.recompenseCredits, body.nombreDeQuestions);
    }
    
    @UseGuards(AuthGuard)
    @Get('/:id')
    findQuizById(@Param('id', ParseIntPipe) id:number){
        return this.quizService.findQuizById(id);
    }

    @UseGuards(AdmAuthGuard)
    @Get('/delete/:id')
    deleteQuizById(@Param('id', ParseIntPipe) id: number){
        return this.quizService.deleteOneQuizById(id);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAllQuiz() {
        return this.quizService.findAllQuiz()
    }


}
