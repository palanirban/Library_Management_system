import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ensure common body parsers are enabled
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // Allow cross-origin requests from the frontend during development
  app.enableCors();

  // Log every incoming request and corresponding response
  app.use((req, res, next) => {
    const start = Date.now();
    const { method, originalUrl } = req as any;
    const ip = (req as any).ip || (req as any).connection?.remoteAddress;
    const safeBody = req.body && Object.keys(req.body).length ? JSON.stringify(req.body) : undefined;
    console.log(`[Request] ${new Date().toISOString()} ${method} ${originalUrl} - ip: ${ip}${safeBody ? ` - body: ${safeBody}` : ''}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[Response] ${method} ${originalUrl} ${res.statusCode} - ${duration}ms`);
    });

    next();
  });

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);

  const url = await app.getUrl();
  console.log(`Server started on port: ${port}`);
  console.log(`Application is running on: ${url}`);
}

bootstrap();
