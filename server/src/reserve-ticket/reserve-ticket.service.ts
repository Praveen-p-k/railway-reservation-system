import { Inject, Injectable } from '@nestjs/common';
import { ReserveMultipleTicketsDto } from './dto/reseve-multiple-tickets.dto';
import { SeatRepository } from 'src/seat/repositories/seat.repository';
import { MONGO_QUERY_CONDITIONS } from 'src/shared-kernel/constant/mongo-queries.constant';
import { BERTH_TYPES } from 'src/passenger/constants/passenger.enums';
import { CompartmentRepository } from 'src/compartment/repositories/compartment.repository';
import { ReserveSingleTicketDto } from './dto/reserve-single-ticket.dto';
import { PassengerRepository } from 'src/passenger/repositories/passenger.repository';
import { Seat } from 'src/seat/schemas/seat.schema';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class ReserveTicketService {
  constructor(
    @Inject() private seatRepository: SeatRepository,
    @Inject() private compartmentRepository: CompartmentRepository,
    @Inject() private passengerRepository: PassengerRepository,
  ) {}

  async searchAVLSleeperSeatsInNearestCabin(
    seatsRequired: number,
    berthPreference: Map<string, number>,
    totalCompartments: number,
    currentCompartmentID: number = 1,
    confirmedDistances: {
      start: number;
      end: number;
    } = { start: 1, end: 100 },
    seatInfo = [],
  ) {
    const originalBerthPreference = new Map(berthPreference);
    if (currentCompartmentID > totalCompartments) {
      return {
        seatInfo,
      };
    }

    const { cabins } =
      await this.compartmentRepository.findCompartmentByID(
        currentCompartmentID,
      );

    for (let i = 0; i < cabins.length; i++) {
      let countedSeats = 0;
      const tempSeatInfo = [];
      for (let j = 0; j < cabins.length; j++) {
        for (const seat of cabins[j].seats) {
          if (countedSeats === seatsRequired) {
            if (j - i < confirmedDistances.end - confirmedDistances.start)
              confirmedDistances = {
                start: i + 1,
                end: j + 1,
              };
            seatInfo = tempSeatInfo;
            break;
          }

          if (confirmedDistances.end === confirmedDistances.start) {
            return { seatInfo };
          }

          if (!seat.isSold && berthPreference.get(seat.seatType)) {
            if (berthPreference[seat.seatType] === 0) {
              berthPreference.delete(seat.seatType);
            } else {
              berthPreference.set(
                seat.seatType,
                berthPreference.get(seat.seatType) - 1,
              );
            }

            tempSeatInfo.push(seat);
            countedSeats++;
          }
        }
      }
    }

    return this.searchAVLSleeperSeatsInNearestCabin(
      seatsRequired,
      originalBerthPreference,
      totalCompartments,
      currentCompartmentID + 1,
      confirmedDistances,
      seatInfo,
    );
  }

  searchAVLSleeperSeatsInNearestCompartment() {}

  searchAVLRACSeatsInNearestCabin(
    berthPreference: Record<string, number>,
    totalCompartments: number,
  ) {
    console.log(berthPreference, totalCompartments);
  }

  async confirmBooking(passengers: ReserveSingleTicketDto[], seats: any) {
    const seatsByType = new Map<string, Seat[]>();
    seats.forEach((seat: Seat) => {
      if (!seatsByType.has(seat.seatType)) {
        seatsByType.set(seat.seatType, []);
      }
      seatsByType.get(seat.seatType).push(seat);
    });

    const confirmedBookings = passengers.map(async (passenger) => {
      const preferredSeats = seatsByType.get(passenger.berthPreference);

      if (preferredSeats && preferredSeats.length > 0) {
        const allocatedSeat = preferredSeats.shift();
        if (allocatedSeat) {
          allocatedSeat.isSold = true;
          allocatedSeat.passenger =
            await this.passengerRepository.createPassenger({
              age: passenger.age,
              allotedBerth: allocatedSeat,
              name: passenger.passengerName,
              preferredBerth: passenger.berthPreference,
              passengerID: uuidV4(),
            });

          await this.seatRepository.updateSeat(allocatedSeat);
          return await this.seatRepository.findSeatByID(
            allocatedSeat.compartmentID,
            allocatedSeat.cabinID,
            allocatedSeat.seatNumber,
          );
        }
      } else {
        return `No available seats for ${passenger.passengerName} with preference ${passenger.berthPreference}`;
      }
    });

    return await Promise.all(confirmedBookings);
  }

  async reserveSeats({ bookingList }: ReserveMultipleTicketsDto) {
    const berthPreferenceMap = new Map();

    bookingList.forEach((booking) =>
      berthPreferenceMap.set(
        booking.berthPreference,
        (berthPreferenceMap.get(booking.berthPreference) || 0) + 1,
      ),
    );

    const [avlSleeperSeats, totalCompartments] = await Promise.all([
      this.seatRepository.countAvailableSeatsBySeatType(
        MONGO_QUERY_CONDITIONS.NOT_EQUAL_TO,
        BERTH_TYPES.RAC,
      ),
      this.compartmentRepository.countTotalCompartments(),
    ]);

    if (avlSleeperSeats === 0) {
      // TODO: Need to implement RAC reservation
      const avlRACSeats =
        await this.seatRepository.countAvailableSeatsBySeatType(
          MONGO_QUERY_CONDITIONS.EQUAL_TO,
          BERTH_TYPES.RAC,
        );

      if (avlRACSeats === 0) {
        // TODO: Need to handle the waiting list bookings
      } else if (avlRACSeats >= bookingList.length) {
        this.searchAVLRACSeatsInNearestCabin(
          berthPreferenceMap as unknown as Record<string, number>,
          totalCompartments,
        );
      } else {
        return `All sleeper seats full. Only ${avlRACSeats} RAC seats are available.`;
      }
    } else if (avlSleeperSeats >= bookingList.length) {
      const { seatInfo } = await this.searchAVLSleeperSeatsInNearestCabin(
        bookingList.length,
        berthPreferenceMap,
        totalCompartments,
      );

      return await this.confirmBooking(bookingList, seatInfo);
    } else {
      return `Only ${avlSleeperSeats} Sleeper seats are available.`;
    }
  }
}
