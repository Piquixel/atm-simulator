import { Component, input, output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { Customer } from '@models/customer';

@Component({
  selector: 'app-cards-landing',
  imports: [ MatButtonModule, MatCardModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class CardsLanding {
  public customersList = input<Customer[]>([])
  public toCustomerAdd = output();
  public toCardAdd = output<Customer>()

  public goToCustomerForm = (): void => this.toCustomerAdd.emit();

  public goToCardForm = (customer: Customer) => this.toCardAdd.emit(customer)
}
