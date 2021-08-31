import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);	
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT;
  const config = new DocumentBuilder()
    .setTitle('Example')
    .setDescription('Auth/SignUp is public route. All requests to other routes must contain jwt token.')
    .setVersion('0.0.1')
	.addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT || 4000);
}
bootstrap();