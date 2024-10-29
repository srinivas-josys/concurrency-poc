import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './tasks/task.controller';
import { PQueueService } from './tasks/pqueue.service';
import { PLimitService } from './tasks/plimit.service';

@Module({
  imports: [],
  controllers: [AppController, TaskController],
  providers: [AppService, PQueueService, PLimitService],
})
export class AppModule {}
