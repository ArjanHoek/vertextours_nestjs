import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RefugeModule } from './refuge/refuge.module';

import { User } from './entities/user.entity';
import { Refuge } from './entities/refuge.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (conf: ConfigService) => ({
        type: 'postgres',
        host: conf.get('DB_HOST'),
        port: +conf.get('DB_PORT'),
        username: conf.get('DB_USER'),
        password: conf.get('DB_PASS'),
        database: conf.get('DB_NAME'),
        entities: [User, Refuge],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RefugeModule,
    ConfigModule.forRoot({}),
  ],
})
export class AppModule {}
