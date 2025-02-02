import { Module } from '@nestjs/common';
import { ReserveTicketService } from './reserve-ticket.service';
import { ReserveTicketController } from './reserve-ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Seat, SeatSchema } from 'src/seat/schemas/seat.schema';
import { SeatRepository } from 'src/seat/repositories/seat.repository';
import { CompartmentRepository } from 'src/compartment/repositories/compartment.repository';
import {
  Compartment,
  CompartmentSchema,
} from 'src/compartment/schemas/compartment.schema';
import { PassengerRepository } from 'src/passenger/repositories/passenger.repository';
import {
  Passenger,
  PassengerSchema,
} from 'src/passenger/schemas/passenger.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Seat.name, schema: SeatSchema },
      { name: Compartment.name, schema: CompartmentSchema },
      { name: Passenger.name, schema: PassengerSchema },
    ]),
  ],
  controllers: [ReserveTicketController],
  providers: [
    ReserveTicketService,
    SeatRepository,
    CompartmentRepository,
    PassengerRepository,
  ],
})
export class ReserveTicketModule {}
