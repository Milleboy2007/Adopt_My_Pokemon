import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SatisfactionForm } from './entities/satisfaction-form.entities';
import { SatisfactionFormService } from './satisfaction-form/satisfaction-form.service';
import { SatisfactionFormController } from './satisfaction-form/satisfaction-form.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SatisfactionForm])],
  controllers: [SatisfactionFormController],
  providers: [SatisfactionFormService]
})
export class SatisfactionFormModule {}
