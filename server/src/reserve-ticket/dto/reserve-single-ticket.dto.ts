import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { BERTH_TYPES } from 'src/passenger/constants/passenger.enums';
import { ERROR } from 'src/shared-kernel/expceptions/error.messages';

export class ReserveSingleTicketDto {
  @IsString({ message: ERROR.PASSENGER.NAME.MUST_BE_STRING })
  @IsNotEmpty({ message: ERROR.PASSENGER.NAME.IS_REQUIRED })
  passengerName: string;

  @Type(() => Number)
  @IsInt({ message: ERROR.PASSENGER.AGE.MUST_BE_NUMBER })
  @IsNotEmpty({ message: ERROR.PASSENGER.AGE.IS_REQUIRED })
  age: number;

  @IsEnum(BERTH_TYPES, { message: ERROR.PASSENGER.BERTH_PREFERENCE.IS_INVALID })
  @IsString({ message: ERROR.PASSENGER.BERTH_PREFERENCE.MUST_BE_STRING })
  @IsNotEmpty({ message: ERROR.PASSENGER.BERTH_PREFERENCE.IS_REQUIRED })
  berthPreference: BERTH_TYPES;
}
