import { PartialType } from '@nestjs/mapped-types';
import { CreateCompartmentDto } from './create-compartment.dto';

export class UpdateCompartmentDto extends PartialType(CreateCompartmentDto) {}
