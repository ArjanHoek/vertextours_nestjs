import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RefugeModule } from './refuge/refuge.module';

import { DbModule } from './database/database.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    UserModule,
    RefugeModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
