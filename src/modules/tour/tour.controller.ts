import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { TourService } from './tour.service';
import { findOneOptions } from './query/findOneOptions';

@Controller('tours')
export class TourController {
  constructor(private tourService: TourService) {}

  @Get()
  findAll() {
    return this.tourService.findAll({ select: { id: true, name: true } });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tour = await this.tourService.findOne({
      where: { id },
      ...findOneOptions,
    });

    if (!tour) {
      throw new NotFoundException({
        status: 'error',
        data: { message: `Tour (${id}) not found` },
      });
    }

    return {
      status: 'success',
      data: {
        tour: {
          ...tour,
          stages: tour.stages.map(({ stage }) => stage),
        },
      },
    };
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.tourService.deleteOne(id);
    return { status: 'success' };
  }
}
