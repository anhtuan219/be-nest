import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Payloads coming in over the network are plain JavaScript objects
      // Automatically transform payloads to be objects typed according to their DTO classes
      transform: true,

      // Filter out properties (that should not be received by the method handler) from the resulting DTO
      whitelist: true,
      // Stop the request from processing when non-whitelisted properties (properties that should not be received by the method handler) are present, and return an error response to the user
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
