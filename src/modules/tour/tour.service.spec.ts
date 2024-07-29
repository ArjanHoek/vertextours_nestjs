import { Test, TestingModule } from '@nestjs/testing';
import { TourService } from './tour.service';
import { Tour, User } from 'src/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ExampleService', () => {
  let service: TourService;

  const tourMock: Tour = {
    id: '3',
    created_at: new Date(),
    updated_at: new Date(),
    name: 'Mock Hutte',
    created_by: {} as User,
    stages: [],
  };

  const findMockFn = jest.fn(() => Promise.resolve([tourMock]));
  const findOneMockFn = jest.fn(() => Promise.resolve(tourMock));

  const tourRepositoryMock: Partial<Repository<Tour>> = {
    find: findMockFn,
    findOne: findOneMockFn,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TourService,
        {
          provide: getRepositoryToken(Tour),
          useValue: tourRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<TourService>(TourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return tours', async () => {
    await expect(service.find()).resolves.toStrictEqual([tourMock]);
  });

  // An extra test should be added to check if the stages are correctly mapped

  it('should return a single tour', async () => {
    await expect(service.findOneById(tourMock.id)).resolves.toStrictEqual(
      tourMock,
    );
  });
});
