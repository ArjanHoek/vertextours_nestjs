import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { UserSeederModule } from './user/user.module';
import { SeederService } from './seeder.service';
import { ConfigModule } from '@nestjs/config';
import { RefugeSeederModule } from './refuge/refuge.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserSeederModule,
    RefugeSeederModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
