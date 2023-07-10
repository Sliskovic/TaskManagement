import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './common-exceptions/global-filter/http-exception.filter';
import { AllExceptionsFilter } from './common-exceptions/global-filter/all-exceptions.filter';

const logger = new Logger('bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const port = configService.get<number>('PORT', 3000);

  // CORS configuration
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    preflightContinue: false,
    optionsSuccessStatus: HttpStatus.NO_CONTENT,
  });

  // Global filters
  app.useGlobalFilters(
    new HttpExceptionFilter(configService),
    new AllExceptionsFilter(httpAdapterHost),
  );
  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, skipMissingProperties: true }),
  );
  // Favicon ignore
  app.use(function (req, res, next) {
    if (req.originalUrl && req.originalUrl.split('/').pop() === 'favicon.ico') {
      return res.sendStatus(204);
    }
    next();
  });
  await app.listen(port);
  logger.verbose(`Application is running on: http://localhost:${port}`);
  logger.verbose(`Database is running on: http://localhost:8080`);
}

bootstrap().catch((error) => {
  logger.error('Failed to start the application:', error);
});
