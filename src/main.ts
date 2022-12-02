import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function run() {
  try {
    const PORT = process.env.PORT || 3030
    const app = await NestFactory.create(AppModule);
    await app.listen(3000, () => {
      console.log(`http://localhost:${PORT}`)
    });
  } catch (error) {
    console.log(error)
  }
}
run();
