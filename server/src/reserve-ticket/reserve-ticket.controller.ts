import { Controller, Post, Body } from '@nestjs/common';
import { ReserveTicketService } from './reserve-ticket.service';
import { ReserveSingleTicketDto } from './dto/reserve-single-ticket.dto';
import { ReserveMultipleTicketsDto } from './dto/reseve-multiple-tickets.dto';

@Controller('reserve-ticket')
export class ReserveTicketController {
  constructor(private readonly reserveTicketService: ReserveTicketService) {}

  @Post('/single')
  reserveSingleTicket(@Body() reserveSingleTicketDto: ReserveSingleTicketDto) {
    return reserveSingleTicketDto;
    // return this.reserveTicketService.create(reserveSingleTicketDto);
  }

  @Post('/multiple')
  async reserveMultipleTickets(
    @Body() reserveMultipleTicketsDto: ReserveMultipleTicketsDto,
  ) {
    return this.reserveTicketService.reserveSeats(reserveMultipleTicketsDto);
  }
}
