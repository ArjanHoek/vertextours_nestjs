import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RefugeService } from './refuge.service';
import { CreateRefugeDto, UpdateRefugeDto } from './dto';
import { AuthGuard } from '../auth/guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('refuges')
export class RefugeController {
  constructor(private refugeService: RefugeService) {}

  @Get()
  find(@Query('country') country: string) {
    return this.refugeService.find({ country });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refugeService.findOne({ id });
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createOne(@Body() dto: CreateRefugeDto) {
    return this.refugeService.createOne(dto);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateOne(@Param('id') id: string, @Body() dto: UpdateRefugeDto) {
    return this.refugeService.updateOne(id, dto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id') id: string) {
    return this.refugeService.deleteOne(id);
  }
}
