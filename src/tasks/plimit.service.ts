import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PLimitService implements OnModuleInit {
  private limit: any;

  constructor() {}

  // Use onModuleInit for asynchronous setup
  async onModuleInit() {
    await this.initializePLimit();
  }

  // Dynamically import p-limit
  private async initializePLimit() {
    try {
      // Using dynamic import to load ES module
      const { default: pLimit } = await import('p-limit');
      this.limit = pLimit(3); // Set limit to 3 concurrent tasks
      Logger.log('PLimit initialized');
    } catch (error) {
      Logger.error('Error initializing PLimit:', error);
    }
  }

  // Run a limited task
  async addLimitedTask(task: () => Promise<any>) {
    if (!this.limit) {
      Logger.error('PLimit is not initialized yet');
      return;
    }

    Logger.log('Adding a limited task');
    await this.limit(task);
  }

  // Example task for testing
  async exampleTask() {
    Logger.log('Limited task started...');
    return new Promise((resolve) =>
      setTimeout(() => {
        Logger.log('Limited task completed.');
        resolve('Limited Task result');
      }, 3000),
    );
  }
}
