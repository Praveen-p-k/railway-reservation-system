import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BERTH_TYPES } from '../constants/passenger.enums';
import { Seat } from 'src/seat/schemas/seat.schema';

export type PassengerDocument = HydratedDocument<Passenger>;

@Schema()
export class Passenger {
  @Prop({ required: true, index: true })
  passengerID: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ enum: BERTH_TYPES })
  preferredBerth: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Seat', default: null })
  allotedBerth: Seat;
}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);
