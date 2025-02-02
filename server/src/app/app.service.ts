import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { config } from 'src/config';
import { CABIN_SEAT_BERTHS } from 'src/shared-kernel/constant/berths.constant';
import { CompartmentRepository } from 'src/compartment/repositories/compartment.repository';
import { CabinRepository } from 'src/cabin/repositories/cabin.repository';
import { SeatRepository } from 'src/seat/repositories/seat.repository';
import { TrainCapacityDto } from 'src/app/dto/train-capacity.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject() private compartmentRepository: CompartmentRepository,
    @Inject() private cabinRepository: CabinRepository,
    @Inject() private seatRepository: SeatRepository,
  ) {}

  healthCheck(): string {
    return 'Ok!';
  }

  async dropDatabaseByName(dbName: string) {
    try {
      const dbConnection = this.connection.useDb(dbName);

      await dbConnection.dropDatabase();
      console.log(`Database ${dbName} dropped successfully`);
    } catch (err) {
      console.error(`Error dropping database ${dbName}:`, err);
    }
  }

  async initializeTrain({
    cabinsInCompartment,
    compartmentsInTrain,
  }: TrainCapacityDto) {
    // Drop the existing database
    await this.dropDatabaseByName(config.DATABASE_NAME);

    // Create compartments in parallel
    const compartmentPromises = [];

    for (
      let compartmentID = 1;
      compartmentID <= compartmentsInTrain;
      compartmentID++
    ) {
      const cabinPromises = [];
      let seatNumber = 1;

      for (let cabinID = 1; cabinID <= cabinsInCompartment; cabinID++) {
        // Create seats in parallel
        const seatPromises = CABIN_SEAT_BERTHS.map((seatType) =>
          this.seatRepository.createSeat({
            cabinID,
            compartmentID,
            seatNumber: seatNumber++,
            seatType,
          }),
        );

        // Wait for all seats to be created
        const seatReferences = await Promise.all(seatPromises);

        // Create a cabin with the created seat references
        const cabinPromise = this.cabinRepository.createCabin({
          cabinID,
          compartmentID,
          seats: seatReferences,
        });

        cabinPromises.push(cabinPromise);
      }

      // Wait for all cabins to be created
      const cabinReferences = await Promise.all(cabinPromises);

      // Create a compartment with the created cabin references
      const compartmentPromise = this.compartmentRepository.createCompartment({
        cabins: cabinReferences,
        compartmentID,
      });

      compartmentPromises.push(compartmentPromise);
    }

    // Wait for all compartments to be created
    await Promise.all(compartmentPromises);
  }
}
