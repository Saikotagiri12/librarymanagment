const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');
const { ValidationPipe } = require('@nestjs/common');
const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  // Set up Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Library Management System')
    .setDescription('API for managing library books, users, and audit logs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the server
  await app.listen(3000);
}

bootstrap();
