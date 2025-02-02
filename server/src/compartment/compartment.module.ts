import { Module } from '@nestjs/common';
import { CompartmentService } from './compartment.service';
import { CompartmentController } from './compartment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Compartment, CompartmentSchema } from './schemas/compartment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Compartment.name, schema: CompartmentSchema },
    ]),
  ],
  controllers: [CompartmentController],
  providers: [CompartmentService],
})
export class CompartmentModule {}
