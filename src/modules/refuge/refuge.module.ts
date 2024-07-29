import { Module } from '@nestjs/common';
import { RefugeService } from './refuge.service';
import { RefugeController } from './refuge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refuge } from 'src/entities/refuge.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Refuge]), AuthModule],
  providers: [RefugeService],
  controllers: [RefugeController],
})
export class RefugeModule {}
