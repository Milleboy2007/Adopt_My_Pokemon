import { Controller, Body, Get, Param, ParseIntPipe, UseGuards, Post, Put, Session } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { CreateAdoptionDto } from '../dto/create-adoption.dto';
import { RejectAdoptionDto } from '../dto/reject-adoption.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { AdmAuthGuard } from 'src/guard/admAuth.guards';

@Controller('adoptions')
export class AdoptionController {
  constructor(private adoptionService: AdoptionService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createAdoption(@Body() body: CreateAdoptionDto, @Session() session: any) {
    return this.adoptionService.createAdoption(session.userId, body.pokemonId, body.formulaireId);
  }

  @UseGuards(AuthGuard, AdmAuthGuard)
  @Get('pending')
  getPending() {
    return this.adoptionService.findPending();
  }

  @UseGuards(AuthGuard, AdmAuthGuard)
  @Get('approve')
  getApproved() {
    return this.adoptionService.findApproved();
  }

  @UseGuards(AuthGuard, AdmAuthGuard)
  @Get('reject')
  getRejected() {
    return this.adoptionService.findRejected();
  }

  @UseGuards(AuthGuard, AdmAuthGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.adoptionService.findById(id);
  }

  @UseGuards(AuthGuard, AdmAuthGuard)
  @Put(':id/approve')
  approve(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: any,
  ) {
    return this.adoptionService.approve(id, session.userId);
  }

  @UseGuards(AuthGuard, AdmAuthGuard)
  @Put(':id/reject')
  reject(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: RejectAdoptionDto,
    @Session() session: any,
  ) {
    return this.adoptionService.reject(id, session.userId, body.reason);
  }
}
