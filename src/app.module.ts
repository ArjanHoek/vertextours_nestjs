import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefugeModule } from './refuge/refuge.module';
import { User } from './entities/user.entity';
import { Refuge } from './entities/refuge.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'vertexnest',
      entities: [User, Refuge],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    RefugeModule,
  ],
})
export class AppModule {}
