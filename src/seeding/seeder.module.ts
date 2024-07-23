import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { SeederService } from './seeder.service';
import { ConfigModule } from '@nestjs/config';
import { UserSeederService } from './seeders/user.seeder';
import { RefugeSeederService } from './seeders/refuge.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Refuge } from 'src/entities/refuge.entity';
import { IdentifierService } from './identifiers.service';

const seedEntities = [User, Refuge];
const seeders = [UserSeederService, RefugeSeederService];

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature(seedEntities),
  ],
  providers: [SeederService, IdentifierService, ...seeders],
})
export class SeederModule {}
