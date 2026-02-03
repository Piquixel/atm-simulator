import { Card } from '../card';
import { Customer } from '../customer';
import { BankType } from '../enums/bank-type.enum';
import { CardType } from '../enums/card-type.enum';
import { Gender } from '../enums/gender.enum';

const customer1 = new Customer(
  new Date('01-01-1990'),
  'John',
  'Doe',
  Gender.MALE,
  'Rue des paquerettes 32, 4000 Liège',
  [
    new Card('1234-5678-9872-1562', CardType.MASTERCARD, BankType.BELFIUS, '1234', 1000),
    new Card('3324-1231-0992-3212', CardType.VISA, BankType.ING, '5678', 1000),
  ],
);

const customer2 = new Customer(
  new Date('01-01-2004'),
  'Lucie',
  'Smith',
  Gender.FEMALE,
  'Rue saint-gilles 300, 4000 Liège',
  [
    new Card('5577-1209-3211-0987', CardType.OTHER, BankType.REVOLUT, '1234', 200),
    new Card('8988-1702-6555-1122', CardType.VISA, BankType.ING, '5678', 10000),
  ],
);

export const CUSTOMERS: Customer[] = [customer1, customer2];
