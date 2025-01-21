import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('FindAFriend API')
    .setDescription(
      'API to find pets from various organizations. This API allows users to search for pets, view details, and manage pet adoption processes.',
    )
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  const envService = app.get(EnvService)
  const port = envService.get('PORT')
  await app.listen(port)
}
bootstrap()
