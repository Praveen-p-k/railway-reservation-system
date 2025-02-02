import { NestFactory } from '@nestjs/core';
import { config } from './config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** BACKEND CONFIGS */
  // For handling validation of input datas
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix(config.APP_BACKEND_PREFIX);

  /** SWAGGER */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('User Creation Example')
    .setDescription('The Create User API')
    .setVersion('1.0')
    .addTag('EventListener')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.PORT);
}
bootstrap();
