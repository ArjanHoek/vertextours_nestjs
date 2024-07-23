import { Controller, Get, Param } from '@nestjs/common';
import { RefugeService } from './refuge.service';

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
}
