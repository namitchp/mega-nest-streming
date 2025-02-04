import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './apis/users.controller';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),],
  // imports: [UsersModule],
  controllers: [AppController, UserController],
  providers: [AppService],
  exports: [],
})
export class AppModule { }
