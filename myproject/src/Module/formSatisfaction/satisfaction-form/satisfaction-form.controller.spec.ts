import { Test, TestingModule } from '@nestjs/testing';
import { SatisfactionFormController } from './satisfaction-form.controller';

describe('SatisfactionFormController', () => {
  let controller: SatisfactionFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SatisfactionFormController],
    }).compile();

    controller = module.get<SatisfactionFormController>(SatisfactionFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
