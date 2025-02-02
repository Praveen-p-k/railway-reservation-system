import { Module } from '@nestjs/common';
import { AppController } from 'src/app/app.controller';
import { AppService } from 'src/app/app.service';
import { CabinModule } from 'src/cabin/cabin.module';
import { SeatModule } from 'src/seat/seat.module';
import { PassengerModule } from 'src/passenger/passenger.module';
import { CompartmentModule } from 'src/compartment/compartment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { config } from 'src/config';
import { Seat, SeatSchema } from 'src/seat/schemas/seat.schema';
import { Cabin, CabinSchema } from 'src/cabin/schemas/cabin.schema';
import {
  Compartment,
  CompartmentSchema,
} from 'src/compartment/schemas/compartment.schema';
import { CompartmentRepository } from 'src/compartment/repositories/compartment.repository';
import { CabinRepository } from 'src/cabin/repositories/cabin.repository';
import { SeatRepository } from 'src/seat/repositories/seat.repository';
import { ReserveTicketModule } from 'src/reserve-ticket/reserve-ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(config.MONGODB_URL),
    MongooseModule.forFeature([{ name: Seat.name, schema: SeatSchema }]),
    MongooseModule.forFeature([{ name: Cabin.name, schema: CabinSchema }]),
    MongooseModule.forFeature([
      { name: Compartment.name, schema: CompartmentSchema },
    ]),

    CabinModule,
    SeatModule,
    PassengerModule,
    CompartmentModule,
    ReserveTicketModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CompartmentRepository,
    CabinRepository,
    SeatRepository,
  ],
})
export class AppModule {}
