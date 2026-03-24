import { Module } from '@nestjs/common';
import { AdoptionController } from './adoption/adoption.controller';
import { AdoptionService } from './adoption/adoption.service';
import { FormsService } from './forms/forms.service';
import { FormsController } from './forms/forms.controller';

@Module({
  controllers: [AdoptionController, FormsController],
  providers: [AdoptionService, FormsService]
})
export class AdoptionModule {}
