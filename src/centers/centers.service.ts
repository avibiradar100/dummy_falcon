import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Center } from './entities/center.entity';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';

@Injectable()
export class CentersService {
  constructor(
    @InjectRepository(Center)
    private readonly centerRepository: Repository<Center>,
  ) {}

  async findAll(): Promise<Center[]> {
    return await this.centerRepository.find();
  }

  async findByCenterId(centerId: string): Promise<Center> {
    const center = await this.centerRepository.findOne({
      where: { centerId },
    });

    if (!center) {
      throw new NotFoundException(`Center with ID ${centerId} not found`);
    }

    return center;
  }

  async create(createCenterDto: CreateCenterDto): Promise<Center> {
    const existingCenter = await this.centerRepository.findOne({
      where: { centerId: createCenterDto.centerId },
    });

    if (existingCenter) {
      throw new ConflictException(
        `Center with ID ${createCenterDto.centerId} already exists`,
      );
    }

    const center = this.centerRepository.create(createCenterDto);
    return await this.centerRepository.save(center);
  }

  async update(
    centerId: string,
    updateCenterDto: UpdateCenterDto,
  ): Promise<Center> {
    const center = await this.centerRepository.findOne({
      where: { centerId },
    });

    if (!center) {
      throw new NotFoundException(`Center with ID ${centerId} not found`);
    }

    Object.assign(center, updateCenterDto);
    return await this.centerRepository.save(center);
  }
}
