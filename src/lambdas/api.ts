import { NestFactory } from '@nestjs/core';
import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { AppModule } from '../app.module';
import { Handler, Context, Callback } from 'aws-lambda';

let cachedServer: Handler;

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    await nestApp.init();
        
    const expressApp = nestApp.getHttpAdapter().getInstance();
    
    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer(event, context, callback);
};
