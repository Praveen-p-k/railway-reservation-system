import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cabin } from '../schemas/cabin.schema';

@Injectable()
export class CabinRepository {
  constructor(@InjectModel(Cabin.name) private cabinModel: Model<Cabin>) {}

  async createCabin(cabin: Cabin): Promise<Cabin> {
    const createdCabin = new this.cabinModel(cabin);
    return createdCabin.save();
  }

  async findAllCabin(): Promise<Cabin[]> {
    return this.cabinModel.find().exec();
  }

  async findCabinByID(cabinID: number, compartmentID: number): Promise<Cabin> {
    return this.cabinModel
      .findOne({
        cabinID,
        compartmentID,
      })
      .populate('seats')
      .exec();
  }
}
