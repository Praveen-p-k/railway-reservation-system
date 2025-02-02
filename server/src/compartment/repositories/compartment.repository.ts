import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Compartment } from '../schemas/compartment.schema';

@Injectable()
export class CompartmentRepository {
  constructor(
    @InjectModel(Compartment.name) private compartmentModel: Model<Compartment>,
  ) {}

  createCompartment(compartment: Compartment): Promise<Compartment> {
    const createdCompartment = new this.compartmentModel(compartment);
    return createdCompartment.save();
  }

  findAllCompartment(): Promise<Compartment[]> {
    return this.compartmentModel.find().exec();
  }

  findCompartmentByID(compartmentID: number): Promise<Compartment> {
    return this.compartmentModel
      .findOne({
        compartmentID,
      })
      .populate({
        path: 'cabins',
        model: 'Cabin',
        populate: {
          path: 'seats',
          model: 'Seat',
        },
      })
      .exec();
  }

  countTotalCompartments(): Promise<number> {
    return this.compartmentModel.countDocuments();
  }
}
