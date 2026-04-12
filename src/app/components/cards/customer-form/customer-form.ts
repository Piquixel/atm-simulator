import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Gender } from 'models/enums/gender.enum';
import { Customer } from 'models/customer';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-customer-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerForm {
  constructor() {
    [this.customerForm.controls.firstName, this.customerForm.controls.lastName].forEach(
      (field: FormControl<string | null>) => {
        field.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
          if (value === null) return;
          return this.formatName(value, field);
        });
      },
    );
  }

  // Inputs
  public readonly customersList = input<Customer[]>([]);

  // Outputs
  public submitCustomer = output<Customer[]>();
  public cancelCustomer = output();

  // Properties
  public readonly gender = Gender;
  private readonly _currentYear = new Date().getUTCFullYear();

  public readonly dateLimits = {
    minDate: new Date(this._currentYear - 100, 0, 1),
    maxDate: new Date(this._currentYear - 18, new Date().getUTCMonth(), new Date().getUTCDate()),
  };

  // FormControls
  public customerForm = new FormGroup({
    birthDate: new FormControl(null, [Validators.required]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z\u00C0-\u024F\u1E00-\u1EFF' -]{3,}$/im),
    ]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl(Gender.FEMALE, [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl(null, [
      Validators.min(1000),
      Validators.max(9992),
    ]),
  });

  // Methods
  public createCustomer(): void {
    const newCustomer = new Customer(
      uuidv4(),
      this.customerForm.controls.birthDate.value!,
      this.customerForm.controls.firstName.value!,
      this.customerForm.controls.lastName.value!,
      this.customerForm.controls.gender.value!,
      `${this.customerForm.controls.address.value} ${this.customerForm.controls.postalCode.value} ${this.customerForm.controls.city.value}`,
      [],
    );

    this.customersList().push(newCustomer);

    this.submitCustomer.emit(this.customersList());
  }

  public leaveForm(): void {
    this.cancelCustomer.emit();
  };

  private formatName(name: string, field: FormControl<string | null>): void {
    if (name === '') return;
    const applyCase = (str: string) => {
      if (str === '') return;
      return str[0].toLocaleUpperCase() + str.substring(1).toLowerCase();
    };

    const formatedName: string = name
      .split(/-| /)
      .map(n => applyCase(n))
      .join('-');

    field.setValue(formatedName.trim(), { emitEvent: false });
  }
}
