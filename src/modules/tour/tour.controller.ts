import { Controller, Get, Param } from '@nestjs/common';
import { TourService } from './tour.service';

@Controller('tours')
export class TourController {
  constructor(private tourService: TourService) {}

  @Get()
  async findAll() {
    const tours = await this.tourService.findAll();
    return { tours };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tour = await this.tourService.findOne({ id });
    return { tour };
  }
}
