import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.prod.env', '.test.env', '.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
