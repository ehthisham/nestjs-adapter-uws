
import { NestFactory } from '@nestjs/core';
import { UwsAdapter } from 'nestjs-platform-uws'
import AppModule from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new UwsAdapter());
    await app.listen(3000);
}
bootstrap();