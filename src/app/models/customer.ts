import { Card } from "./card";
import { Gender } from "./enums/gender.enum";

export class Customer {
  constructor(
    private readonly birthdate: Date,
    private firstname: string,
    private lastname: string,
    private gender: Gender,
    private address: string,
    private cards: Card[]
  ) {}
}
