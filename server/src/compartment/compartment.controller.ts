import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompartmentService } from './compartment.service';
import { CreateCompartmentDto } from './dto/create-compartment.dto';
import { UpdateCompartmentDto } from './dto/update-compartment.dto';

@Controller('compartment')
export class CompartmentController {
  constructor(private readonly compartmentService: CompartmentService) {}

  @Post()
  create(@Body() createCompartmentDto: CreateCompartmentDto) {
    return this.compartmentService.create(createCompartmentDto);
  }

  @Get()
  findAll() {
    return this.compartmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compartmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompartmentDto: UpdateCompartmentDto) {
    return this.compartmentService.update(+id, updateCompartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compartmentService.remove(+id);
  }
}
