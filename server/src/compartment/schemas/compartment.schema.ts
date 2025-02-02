import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Cabin } from 'src/cabin/schemas/cabin.schema';

export type CompartmentDocument = HydratedDocument<Compartment>;

@Schema()
export class Compartment {
  @Prop({ required: true })
  compartmentID: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cabin' }],
    default: [],
  })
  cabins: Cabin[];
}

export const CompartmentSchema = SchemaFactory.createForClass(Compartment);
