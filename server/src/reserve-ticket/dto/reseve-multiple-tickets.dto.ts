import { ArrayMaxSize, ArrayMinSize, ValidateNested } from 'class-validator';
import { ReserveSingleTicketDto } from './reserve-single-ticket.dto';
import { BOOKINGS_CONSTRAINTS } from '../reserve-ticket.constants';
import { ERROR } from 'src/shared-kernel/expceptions/error.messages';
import { Type } from 'class-transformer';

export class ReserveMultipleTicketsDto {
  @Type(() => ReserveSingleTicketDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(BOOKINGS_CONSTRAINTS.MIN_TICKET_PER_BOOKING, {
    message: ERROR.BOOKING.MIN_TICKETS_PER_BOOKING,
  })
  @ArrayMaxSize(BOOKINGS_CONSTRAINTS.MAX_TICKET_PER_BOOKING, {
    message: ERROR.BOOKING.MAX_TICKETS_PER_BOOKING_REACHED,
  })
  bookingList: ReserveSingleTicketDto[];
}
