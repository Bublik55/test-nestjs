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
    .setDescription(
      `Auth/SignUp is public route.\n All requests to other routes must contain jwt token.
      User can create column by <b>users/{userid}/colummns</b> route in one case:\n
      \t Client's userID == {userID}\n
      User can update and delete sources in one case - he/she is author of source.\n
      Data from DB will not serialized.\n 
      `,
    )
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT || 4000);
}
bootstrap();
