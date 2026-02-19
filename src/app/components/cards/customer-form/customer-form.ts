import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Gender } from '@models/enums/gender.enum.js';
import { ICustomer } from '@models/index.js';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatRadioModule, MatButtonModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm {
  public customersList = input<ICustomer[]>([])
  public gender = Gender
  public customerForm = new FormGroup({
    birthDate: new FormControl(new Date(), [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    gender: new FormControl(this.gender.FEMALE,[Validators.required]),
    address: new FormControl('',[Validators.required])
  })

  public whenCreate = output()


  public createCustomer() {
    const newCustomer: ICustomer = {
      birthDate: this.customerForm.controls.birthDate.value!,
      firstName: this.customerForm.controls.firstName.value!,
      lastName: this.customerForm.controls.lastName.value!,
      gender: this.customerForm.controls.gender.value!,
      address: this.customerForm.controls.address.value!,
      cards: []
    }
    this.customersList().push(newCustomer)
    localStorage['customers'] = this.customersList()
    this.whenCreate.emit()
  }
}
