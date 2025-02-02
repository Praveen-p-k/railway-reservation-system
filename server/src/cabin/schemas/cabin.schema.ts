import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Seat } from 'src/seat/schemas/seat.schema';

export type CabinDocument = HydratedDocument<Cabin>;

@Schema()
export class Cabin {
  @Prop({ required: true })
  cabinID: number;

  @Prop({ required: true })
  compartmentID: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
    default: [],
  })
  seats: Seat[];
}

export const CabinSchema = SchemaFactory.createForClass(Cabin);
