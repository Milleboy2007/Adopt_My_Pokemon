import { Test, TestingModule } from '@nestjs/testing';
import { SatisfactionFormService } from './satisfaction-form.service';

describe('SatisfactionFormService', () => {
  let service: SatisfactionFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SatisfactionFormService],
    }).compile();

    service = module.get<SatisfactionFormService>(SatisfactionFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
