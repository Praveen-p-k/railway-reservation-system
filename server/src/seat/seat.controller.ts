import { Controller, Get } from '@nestjs/common';
import { SeatService } from './seat.service';

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get('/avl/sl')
  async getAvailableSleeperSeatsCount() {
    return await this.seatService.availableSleeperSeatsCount();
  }

  @Get('/avl/rac')
  async getAvailableRACSeatsCount() {
    return await this.seatService.availableRACSeatsCount();
  }
}
