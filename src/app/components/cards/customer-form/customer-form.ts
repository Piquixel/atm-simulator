import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Gender } from '@models/enums/gender.enum.js';
import { Customer } from '@models/customer';
import { v4 as uuidv4 } from 'uuid'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatRadioModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerForm {
  public customersList = input<Customer[]>([])
  public gender = Gender
  public readonly customerForm = new FormGroup({
    birthDate: new FormControl<Date>(new Date(), [Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('',[Validators.required]),
    gender: new FormControl<Gender>(this.gender.FEMALE,[Validators.required]),
    address: new FormControl<string>('', [Validators.required]),
    city: new FormControl<string>('', [Validators.required]),
    postalCode: new FormControl<number>(NaN, [Validators.required, Validators.min(1000), Validators.max(9992)])
  })

  private _currentYear = new Date().getUTCFullYear()

  public readonly dateLimits = {
    minDate: new Date(this._currentYear - 100, 0, 1),
    maxDate: new Date(this._currentYear - 18, new Date().getUTCMonth(), new Date().getUTCDate())
  }

  public onSubmit = output<Customer[]>()
  public onReset = output()


  public createCustomer() {
    const newCustomer = new Customer(
      uuidv4(),
      this.customerForm.controls.birthDate.value!,
      this.customerForm.controls.firstName.value!,
      this.customerForm.controls.lastName.value!,
      this.customerForm.controls.gender.value!,
      `${this.customerForm.controls.address.value!} ${this.customerForm.controls.postalCode.value} ${this.customerForm.controls.city.value}`,
      []
    );

    this.customersList().push(newCustomer)

    this.onSubmit.emit(this.customersList())
  }

  public returnToLanding = (): void => this.onReset.emit()
}
