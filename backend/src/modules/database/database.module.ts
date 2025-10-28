import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forRootAsync({
    useClass:DatabaseService
  })],
  exports:[MongooseModule]
})
export class DatabaseModule {}
