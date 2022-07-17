
import { NestFactory } from '@nestjs/core';
import { Es4xAdapter } from 'nestjs-platform-es4x'
import AppModule from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new Es4xAdapter());
    await app.listen(3000);
}
bootstrap();