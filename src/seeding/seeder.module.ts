import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { SeederService } from './seeder.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentifierService } from './identifiers.service';
import { entitiesList } from 'src/entities';
import { seedersList } from './seeders';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature(entitiesList),
  ],
  providers: [SeederService, IdentifierService, ...seedersList],
})
export class SeederModule {}
