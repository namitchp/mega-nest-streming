import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './apis/users.controller';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [],
  // imports: [UsersModule],
  controllers: [AppController, UserController],
  providers: [AppService],
  exports: [],
})
export class AppModule { }
