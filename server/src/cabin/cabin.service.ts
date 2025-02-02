import { Injectable } from '@nestjs/common';
import { CreateCabinDto } from './dto/create-cabin.dto';
import { UpdateCabinDto } from './dto/update-cabin.dto';

@Injectable()
export class CabinService {
  create(createCabinDto: CreateCabinDto) {
    return 'This action adds a new cabin';
  }

  findAll() {
    return `This action returns all cabin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cabin`;
  }

  update(id: number, updateCabinDto: UpdateCabinDto) {
    return `This action updates a #${id} cabin`;
  }

  remove(id: number) {
    return `This action removes a #${id} cabin`;
  }
}
