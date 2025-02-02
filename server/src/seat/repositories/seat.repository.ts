import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Seat } from '../schemas/seat.schema';

@Injectable()
export class SeatRepository {
  constructor(@InjectModel(Seat.name) private SeatModel: Model<Seat>) {}

  async createSeat(seat: Seat): Promise<Seat> {
    const createdSeat = new this.SeatModel(seat);
    return createdSeat.save();
  }

  async createManySeat(seats: Seat[]): Promise<Seat[]> {
    return this.SeatModel.insertMany(seats);
  }

  async updateSeat(seat: Seat): Promise<UpdateWriteOpResult> {
    return this.SeatModel.updateOne(
      {
        cabinID: seat.cabinID,
        compartmentID: seat.compartmentID,
        seatNumber: seat.seatNumber,
      },
      { $set: seat },
    );
  }

  async findAllSeat(): Promise<Seat[]> {
    return this.SeatModel.find().exec();
  }

  async findSeatByID(
    compartmentID: number,
    cabinID: number,
    seatNumber: number,
  ): Promise<Seat> {
    return this.SeatModel.findOne({
      compartmentID,
      cabinID,
      seatNumber,
    })
      .populate('passenger')
      .exec();
  }

  async countAvailableSeatsBySeatType(condition: string, seatType: string) {
    return this.SeatModel.countDocuments({
      isSold: { $eq: false },
      seatType: { [`$${condition}`]: seatType },
    }).exec();
  }
}
