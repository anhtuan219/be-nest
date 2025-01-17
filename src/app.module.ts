import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import helmet from 'helmet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { LoggerMiddleware } from '~/logger/logger.middleware';

@Module({
  imports: [TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        // Applying helmet as global or registering it must come before other calls to app.use() or setup functions that may call app.use()
        // => helmet will be the first middleware that is applied
        helmet(),
        LoggerMiddleware,
      )
      .forRoutes('*');
  }
}
