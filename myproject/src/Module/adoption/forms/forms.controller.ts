import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormulaireDto } from '../dto/create-formulaire.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { AdmAuthGuard } from 'src/guard/admAuth.guards';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() body: CreateFormulaireDto) {
    return this.formsService.create(body);
  }

  @UseGuards(AuthGuard, AdmAuthGuard)
  @Get()
  findAll() {
    return this.formsService.findAll();
  }

  @UseGuards(AuthGuard, AdmAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.formsService.findOne(id);
  }

  @UseGuards(AuthGuard, AdmAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.formsService.delete(id);
  }
}