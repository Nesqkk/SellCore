import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
