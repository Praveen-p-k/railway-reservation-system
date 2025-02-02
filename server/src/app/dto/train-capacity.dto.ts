import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ERROR } from 'src/shared-kernel/expceptions/error.messages';

export class TrainCapacityDto {
  @Type(() => Number)
  @IsInt({ message: ERROR.COMPARTMENT.ID_SHOULD_BE_NUMBER })
  @IsNotEmpty({ message: ERROR.COMPARTMENT.ID_REQUIRED })
  compartmentsInTrain: number;

  @Type(() => Number)
  @IsInt({ message: ERROR.CABIN.ID_SHOULD_BE_NUMBER })
  @IsNotEmpty({ message: ERROR.CABIN.ID_REQUIRED })
  cabinsInCompartment: number;
}
