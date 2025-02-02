import { Injectable } from '@nestjs/common';
import { CreateCompartmentDto } from './dto/create-compartment.dto';
import { UpdateCompartmentDto } from './dto/update-compartment.dto';

@Injectable()
export class CompartmentService {
  create(createCompartmentDto: CreateCompartmentDto) {
    return 'This action adds a new compartment';
  }

  findAll() {
    return `This action returns all compartment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compartment`;
  }

  update(id: number, updateCompartmentDto: UpdateCompartmentDto) {
    return `This action updates a #${id} compartment`;
  }

  remove(id: number) {
    return `This action removes a #${id} compartment`;
  }
}
