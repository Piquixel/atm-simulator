import { Injectable, signal } from '@angular/core';
import { Card } from 'models/card.js';
import { Customer } from 'models/customer.js';
import { ICustomer } from 'models/index.js';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private _customers = signal<Customer[]>(this.loadFromStorage())

  public customers = this._customers.asReadonly()

  private loadFromStorage(): Customer[] {
    const data = localStorage.getItem('customers');
    if (!data) return [];
    const raw = JSON.parse(data) as ICustomer[];
    return raw.map(c => this.mapToClass(c));
  }

  public save(customers: Customer[]): void {
    this._customers.set(customers);
    localStorage.setItem('customers', JSON.stringify(customers))
  }

  private mapToClass(c: ICustomer): Customer {
    const cards = c._cards.map(card => new Card(card._cardNumber, card._type, card._bank, card._pin, card._balance)) || []
    return new Customer(c._uuid, c._birthdate, c._firstname, c._lastname, c._gender, c._address, cards)
  }
}
