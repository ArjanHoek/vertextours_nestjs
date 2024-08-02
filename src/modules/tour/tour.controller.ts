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
import { AuthGuard } from '../auth/guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums';
import { RolesGuard } from '../auth/guards/roles.guard';

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
  @Roles(Role.Admin, Role.Manager)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id') id: string) {
    return this.tourService.delete(id);
  }
}
