import { Gender } from 'enums/gender.enum';
import { ICard } from './card.interface';

export interface ICustomer {
  _uuid: string;
  _birthdate: Date;
  _firstname: string;
  _lastname: string;
  _gender: Gender;
  _address: string;
  _cards: ICard[];
}
