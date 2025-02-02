import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CabinService } from './cabin.service';
import { CreateCabinDto } from './dto/create-cabin.dto';
import { UpdateCabinDto } from './dto/update-cabin.dto';

@Controller('cabin')
export class CabinController {
  constructor(private readonly cabinService: CabinService) {}

  @Post()
  create(@Body() createCabinDto: CreateCabinDto) {
    return this.cabinService.create(createCabinDto);
  }

  @Get()
  findAll() {
    return this.cabinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cabinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCabinDto: UpdateCabinDto) {
    return this.cabinService.update(+id, updateCabinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cabinService.remove(+id);
  }
}
