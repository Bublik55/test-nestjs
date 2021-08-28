import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);	
  app.use(cookieParser());
  const PORT = process.env.PORT;
  const config = new DocumentBuilder()
    .setTitle('Example')
    .setDescription('')
    .setVersion('0.0.1')
    .addTag('some')
	.addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT || 4000);
}
bootstrap();