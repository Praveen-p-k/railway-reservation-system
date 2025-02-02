import { Module } from '@nestjs/common';
import { CabinService } from './cabin.service';
import { CabinController } from './cabin.controller';
import { Cabin, CabinSchema } from './schemas/cabin.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cabin.name, schema: CabinSchema }]),
  ],
  controllers: [CabinController],
  providers: [CabinService],
})
export class CabinModule {}
