import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) { }

  createMongooseOptions():MongooseModuleOptions | Promise<MongooseModuleOptions> {
    const userName = this.configService.get('MONGODB_USER')
    const password = this.configService.get('MONGODB_PASSWORD')
    const host = this.configService.get('MONGODB_SERVER')
    const db = this.configService.get('MONGODB_DATABASE')
    const url = this.configService.get<string>('MongoDB_URL')
    // const uri = `mongodb://${userName}:${encodeURIComponent(password)}@${host}:27017/${db}?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authMechanism=SCRAM-SHA-256`
  const uri = url
  console.log('MongoDb connection Successfully')
    return { uri }
  }

}
