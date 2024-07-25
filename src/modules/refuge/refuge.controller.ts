import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RefugeService } from './refuge.service';
import { QueryFailedError } from 'typeorm';
import { RefugeDto, UpdateRefugeDto } from './dto';

@Controller('refuge')
export class RefugeController {
  constructor(private refugeService: RefugeService) {}

  @Get()
  async find(@Query('country') country: string) {
    const refuges = await this.refugeService.find({ country });
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

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.refugeService.deleteOne(id);
  }
}
