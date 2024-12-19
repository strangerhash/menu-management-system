import { Test, TestingModule } from '@nestjs/testing';
import { MenuServiceService } from './menu-service.service';

describe('MenuServiceService', () => {
  let service: MenuServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuServiceService],
    }).compile();

    service = module.get<MenuServiceService>(MenuServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
