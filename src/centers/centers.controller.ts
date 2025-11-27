import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Query,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CentersService } from './centers.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';

@Controller('v1/centers')
export class CentersController {
  constructor(private readonly centersService: CentersService) {}

  @Get()
  async find(@Query('centerId') centerId?: string) {
    if (centerId) {
      const center = await this.centersService.findByCenterId(centerId);
      return center;
    }
    const centers = await this.centersService.findAll();
    return centers;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCenterDto: CreateCenterDto) {

    console.log("center",createCenterDto);
    
    
    const center = await this.centersService.create(createCenterDto);
    return center;
  }

  @Patch(':centerId')
  async update(
    @Param('centerId') centerId: string,
    @Body() updateCenterDto: UpdateCenterDto,
  ) {
    console.log("centerId",centerId);
    console.log("updateCenterDto",updateCenterDto);
    const center = await this.centersService.update(centerId, updateCenterDto);
    return center;
  }
}
