import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello, Welcome to Task Management App!"', () => {
      const expectedResult = 'Hello, Welcome to Task Management App!';
      expect(appController.getHello()).toBe(
        'Hello, Welcome to Task Management App!',
      );
      it('should return "Hello!"', () => {
        const expectedResult = 'Hello, Welcome!';
        expect(appController.getHello()).toBe(
          'Hello, Welcome to Task Management App!',
        );
        jest.spyOn(appService, 'getHello').mockReturnValue(expectedResult);
        const result = appController.getHello();
        expect(result).toBe(expectedResult);
        expect(appService.getHello).toHaveBeenCalled();
      });
    });
  });
});
