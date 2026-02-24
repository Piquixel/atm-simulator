import { Component, input, output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Customer } from '@models/customer';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'app-cards-landing',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatDividerModule, MatFormFieldModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class CardsLanding {
  public customersList = input<Customer[]>([])
  public toCustomerAdd = output();
  public toCardAdd = output<Customer>()
  public toCardEdit = output<Customer>()

  public goToCustomerForm = (): void => this.toCustomerAdd.emit();

  public goToCardForm = (customer: Customer, editMode?: boolean) => !editMode ? this.toCardAdd.emit(customer) : this.toCardEdit.emit(customer)
}
