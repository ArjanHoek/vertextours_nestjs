import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TourService } from './tour.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tours')
export class TourController {
  constructor(private tourService: TourService) {}

  @Get()
  findAll() {
    return this.tourService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourService.findOneById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id') id: string) {
    return this.tourService.delete(id);
  }
}
