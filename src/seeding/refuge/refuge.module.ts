import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Refuge } from 'src/entities/refuge.entity';
import { RefugeSeederService } from './refuge.service';
import { UserSeederModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Refuge]), UserSeederModule],
  providers: [RefugeSeederService],
  exports: [RefugeSeederService],
})
export class RefugeSeederModule {}
