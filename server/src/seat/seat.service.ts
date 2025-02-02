import { Inject, Injectable } from '@nestjs/common';
import { SeatRepository } from './repositories/seat.repository';
import { BERTH_TYPES } from 'src/passenger/constants/passenger.enums';
import { MONGO_QUERY_CONDITIONS } from 'src/shared-kernel/constant/mongo-queries.constant';

@Injectable()
export class SeatService {
  constructor(@Inject() private seatRepository: SeatRepository) {}

  availableSleeperSeatsCount() {
    return this.seatRepository.countAvailableSeatsBySeatType(
      MONGO_QUERY_CONDITIONS.NOT_EQUAL_TO,
      BERTH_TYPES.RAC,
    );
  }

  availableRACSeatsCount() {
    return this.seatRepository.countAvailableSeatsBySeatType(
      MONGO_QUERY_CONDITIONS.EQUAL_TO,
      BERTH_TYPES.RAC,
    );
  }
}
