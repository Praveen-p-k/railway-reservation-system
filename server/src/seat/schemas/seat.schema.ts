import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BERTH_TYPES } from 'src/passenger/constants/passenger.enums';
import { Passenger } from 'src/passenger/schemas/passenger.schema';

export type SeatDocument = HydratedDocument<Seat>;

@Schema()
export class Seat {
  @Prop({ type: Number, required: true })
  seatNumber: number;

  @Prop({ type: Number, required: true })
  cabinID: number;

  @Prop({ type: Number, required: true })
  compartmentID: number;

  @Prop({ required: true, enum: BERTH_TYPES })
  seatType: string;

  @Prop({ type: Boolean, default: false })
  isSold?: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Passenger',
    default: null,
  })
  passenger?: Passenger;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);

// Add a compound index to ensure uniqueness and optimize queries
SeatSchema.index(
  { seatNumber: 1, cabinID: 1, compartmentID: 1 },
  { unique: true },
);
