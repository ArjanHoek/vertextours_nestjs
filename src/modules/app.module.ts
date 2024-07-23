import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RefugeModule } from './refuge/refuge.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    RefugeModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
