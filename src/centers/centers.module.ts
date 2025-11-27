import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentersController } from './centers.controller';
import { CentersService } from './centers.service';
import { Center } from './entities/center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Center])],
  controllers: [CentersController],
  providers: [CentersService],
})
export class CentersModule {}
