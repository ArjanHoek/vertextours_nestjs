import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RefugeModule } from './modules/refuge/refuge.module';
import { DatabaseModule } from './modules/database/database.module';
import { TourModule } from './modules/tour/tour.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    RefugeModule,
    ConfigModule.forRoot(),
    TourModule,
  ],
})
export class AppModule {}
