import { Body,Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateSatisfactionFormDto } from '../dto/create-satisForm.dto';
import { SatisfactionFormService } from './satisfaction-form.service';
import { AdmAuthGuard } from 'src/guard/admAuth.guards';
import { AuthGuard } from 'src/guard/auth.guard';




@Controller('satisfaction-form')
export class SatisfactionFormController {
    constructor (
            private satisfactionFormService: SatisfactionFormService
        ) {}
    @UseGuards(AuthGuard)
    @Post('/createFormSatisfaction')
    CreateSatisfactionForm(@Body() body: CreateSatisfactionFormDto ) {
        return this.satisfactionFormService.createForm(body.name, body.satisfaction, body.comments);
    }
    
    @UseGuards(AdmAuthGuard)
    @Get('/allSatisfaction')
    afficherForm() {
        return this.satisfactionFormService.afficherForm();
    }
}

    