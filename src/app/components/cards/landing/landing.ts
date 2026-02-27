import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Customer } from '@models/customer';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Card } from '@models/card.js';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export interface CustomerDialogData {
  customer: Customer
}

export interface CardDialogData {
  card: Card
}

export function isCurrentPIN(validator: (pin: string) => boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    return validator(value) ? null : { isCurrentPIN: { value: control.value } };
  };
}

@Component({
  selector: 'app-cards-landing',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatDividerModule, MatFormFieldModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsLanding {
  private readonly dialog = inject(MatDialog)

  public customersList = input<Customer[]>([])
  public toCustomerAdd = output();
  public toCardAdd = output<Customer>()
  public toCardEdit = output<Customer>()
  public updateCustomers = output<Customer[]>()

  public selectedCard?: Card;

  public goToCustomerForm = (): void => this.toCustomerAdd.emit();

  public removeCustomer(uuid: string): void {
    this.updateCustomers.emit(this.customersList().filter(customer => customer.uuid !== uuid))
  }

  public goToCardForm = (customer: Customer) => this.toCardAdd.emit(customer)

  public openCustomerRemovalDialog(customer: Customer): void {
    const dialogRef = this.dialog.open(RemoveCustomerDialog, {
      data: {
        customer
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.removeCustomer(customer.uuid)
    })
  }

  public openCardPinModifierDialog(card: Card): void {
    this.selectedCard = card
    const dialogRef = this.dialog.open(ChangePinDialog, {
      height: '320px',
      data: {
        card
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && this.selectedCard) {
        const findCard = (owner: Customer): Card | undefined => owner.cards.find(card => card === this.selectedCard)

        const currentCardOwner = this.customersList().find(customer => findCard(customer))

        if (!currentCardOwner) return

        const ownerIndex = this.customersList().indexOf(currentCardOwner)

        const currentCardIndex = currentCardOwner.cards.indexOf(this.selectedCard)

        this.customersList()[ownerIndex].cards[currentCardIndex].pin = result

        this.updateCustomers.emit(this.customersList())

      }

      this.selectedCard = undefined
    })
  }

  public openCardRemovalDialog(card: Card): void {
    const dialogRef = this.dialog.open(RemoveCardDialog, {
      data: {
        card
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const cardOwner = this.customersList().find(customer => customer.cards.find(c => c === card))

        if (!cardOwner) return

        const ownerIndex = this.customersList().indexOf(cardOwner)

        const filteredCardList = cardOwner.cards.filter(c => c.cardNumber !== card.cardNumber)

        this.customersList()[ownerIndex].cards = filteredCardList

        this.updateCustomers.emit(this.customersList())
      }
    })
  }
}

@Component({
  selector: 'app-dialog-remove-customer',
  templateUrl: 'dialogs/remove-customer.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveCustomerDialog {
  public data = inject<CustomerDialogData>(MAT_DIALOG_DATA)
  public readonly dialogRef = inject(MatDialogRef<RemoveCustomerDialog>)

  public dialogIgnored(): void {
    this.dialogRef.close()
  }
}

@Component({
  selector: 'app-dialog-change-pin',
  templateUrl: 'dialogs/change-card-pin.html',
  styleUrl: 'dialogs/change-card-pin.scss',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePinDialog {
  public readonly data = inject<CardDialogData>(MAT_DIALOG_DATA)

  public readonly dialogRef = inject(MatDialogRef<ChangePinDialog>)

  public pinForm = new FormGroup({
    currentPin: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{4}/g), isCurrentPIN(this.data.card.checkPin)]),
    newPin: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{4}/g)])
  })

  public dialogIgnored(): void {
    this.dialogRef.close()
  }
}

@Component({
  selector: 'app-dialog-remove-card',
  templateUrl: 'dialogs/remove-card.html',
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveCardDialog {
  public readonly dialogRef = inject(MatDialogRef<RemoveCardDialog>)

  public dialogIgnored(): void {
    this.dialogRef.close()
  }
}
