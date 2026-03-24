import { Module } from '@nestjs/common';
import { AdoptionController } from './adoption/adoption.controller';
import { FormsController } from './forms/forms.controller';
import { AdoptionService } from './adoption/adoption.service';
import { FormsService } from './forms/forms.service';
import { AdoptionService } from './adoption/adoption.service';
import { AdoptionController } from './adoption/adoption.controller';

@Module({
  controllers: [AdoptionController, FormsController],
  providers: [AdoptionService, FormsService]
})
export class AdoptionModule {}
