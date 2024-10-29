import { Controller, Get } from '@nestjs/common';
import { PQueueService } from './pqueue.service';
import { PLimitService } from './plimit.service';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly pQueueService: PQueueService,
    private readonly pLimitService: PLimitService,
  ) {}

  @Get('run-pqueue-task')
  async runPQueueTask() {
    await this.pQueueService.addTask(
      () => this.pQueueService.exampleTask(),
      1, // Priority for PQueue task
    );
    return 'PQueue Task added to the queue';
  }

  @Get('run-plimit-task')
  async runPLimitTask() {
    await this.pLimitService.addLimitedTask(() =>
      this.pLimitService.exampleTask(),
    );
    return 'PLimit Task added to the limited executor';
  }
}
