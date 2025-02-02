import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Passenger } from '../schemas/passenger.schema';
import { Model } from 'mongoose';

@Injectable()
export class PassengerRepository {
  constructor(
    @InjectModel(Passenger.name) private passengerModel: Model<Passenger>,
  ) {}

  async createPassenger(passenger: Passenger): Promise<Passenger> {
    const createdCat = new this.passengerModel(passenger);
    return createdCat.save();
  }

  async findAllPassenger(): Promise<Passenger[]> {
    return this.passengerModel.find().exec();
  }

  async findPassengerByID(passengerID: string): Promise<Passenger> {
    return this.passengerModel.findOne({ passengerID }).exec();
  }
}
