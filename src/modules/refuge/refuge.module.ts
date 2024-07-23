import { Module } from '@nestjs/common';
import { RefugeService } from './refuge.service';
import { RefugeController } from './refuge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refuge } from 'src/entities/refuge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Refuge])],
  providers: [RefugeService],
  controllers: [RefugeController],
})
export class RefugeModule {}
