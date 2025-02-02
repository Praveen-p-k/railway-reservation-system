import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Seat, SeatSchema } from './schemas/seat.schema';
import { SeatRepository } from './repositories/seat.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seat.name, schema: SeatSchema }]),
  ],
  controllers: [SeatController],
  providers: [SeatService, SeatRepository],
})
export class SeatModule {}
