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
} from '@nestjs/common';
import { RefugeService } from './refuge.service';
import { CreateRefugeDto, UpdateRefugeDto } from './dto';

@Controller('refuges')
export class RefugeController {
  constructor(private refugeService: RefugeService) {}

  @Get()
  find(@Query('country') country: string) {
    return this.refugeService.find({ country });
  }

  @Post()
  createOne(@Body() dto: CreateRefugeDto) {
    return this.refugeService.createOne(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refugeService.findOne({ id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateOne(@Param('id') id: string, @Body() dto: UpdateRefugeDto) {
    return this.refugeService.updateOne(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id') id: string) {
    return this.refugeService.deleteOne(id);
  }
}
