import { Card } from './card.js';
import { Gender } from './enums/gender.enum.js';

export interface ICustomer {
  birthDate: Date
  firstName: string
  lastName: string
  gender: Gender
  address: string
  cards: Card[]
}
