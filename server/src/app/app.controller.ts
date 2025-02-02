import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from 'src/app/app.service';
import { TrainCapacityDto } from 'src/app/dto/train-capacity.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/check-health')
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Post('/initialize-train')
  async initializeTrain(
    @Body() trainCapacityDto: TrainCapacityDto,
  ): Promise<{ message: string }> {
    await this.appService.initializeTrain(trainCapacityDto);

    return {
      message: 'Train initialized successfully..!',
    };
  }
}
