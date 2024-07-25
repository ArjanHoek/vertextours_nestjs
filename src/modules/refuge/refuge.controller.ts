import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RefugeService } from './refuge.service';
import { QueryFailedError } from 'typeorm';
import { RefugeDto, UpdateRefugeDto } from './dto';

@Controller('refuge')
export class RefugeController {
  constructor(private refugeService: RefugeService) {}

  @Get()
  async find() {
    const refuges = await this.refugeService.find();
    return { refuges };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const refuge = await this.refugeService.findOne({ id });
    return { refuge };
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() dto: UpdateRefugeDto) {
    const refuge = await this.refugeService.updateOne(id, dto);
    return { refuge };
  }

  @Post()
  async createOne(@Body() dto: RefugeDto) {
    try {
      const refuge = await this.refugeService.createOne(dto);
      return { refuge };
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new BadRequestException(err.driverError.detail);
      }
      throw err;
    }
  }
}
