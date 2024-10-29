import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PQueueService implements OnModuleInit {
  private pQueue: any;

  constructor() {}

  // Use onModuleInit for asynchronous setup
  async onModuleInit() {
    await this.initializePQueue();
  }

  // Dynamically import PQueue
  private async initializePQueue() {
    try {
      // Using dynamic import to load ES module
      const { default: PQueue } = await import('p-queue');
      this.pQueue = new PQueue({ concurrency: 2 });
      Logger.log('PQueue initialized');
    } catch (error) {
      Logger.error('Error initializing PQueue:', error);
    }
  }

  // Add a task to the queue
  async addTask(task: () => Promise<any>, priority: number = 0) {
    if (!this.pQueue) {
      Logger.error('PQueue is not initialized yet');
      return;
    }

    Logger.log(`Adding task with priority ${priority}`);
    await this.pQueue.add(task, { priority });
  }

  // Example task for testing
  async exampleTask() {
    Logger.log('Task started...');
    return new Promise((resolve) =>
      setTimeout(() => {
        Logger.log('Task completed.');
        resolve('Task result');
      }, 2000),
    );
  }
}
