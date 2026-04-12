// Imports
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Customer } from 'models/customer';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Card } from 'models/card.js';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BankType } from 'models/enums/bank-type.enum';
import { CardType } from 'models/enums/card-type.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';

// Dialogs Interfaces
export interface CustomerDialogData {
  customer: Customer;
}

export interface CardDialogData {
  card: Card;
}

// Local validator, used to check PIN validity
export function isCurrentPIN(validator: (pin: string) => boolean, invert?: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    return invert ?
    !validator(value) ? null : { isCurrentPIN: { value: control.value } }
    :validator(value) ? null : { isCurrentPIN: { value: control.value } };
  };
}

// Main Component
@Component({
  selector: 'app-cards-landing',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatStepperModule,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsLanding {
  // Injects
  private readonly _dialog: MatDialog = inject(MatDialog);
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);

  // Inputs
  public readonly customersList = input<Customer[]>([]);

  // Outputs
  public readonly customerAddition = output();
  public readonly cardChange = output<Customer>();
  public readonly customersUpdate = output<Customer[]>();

  // Properties
  public selectedCard?: Card;

  // Methods
  //--- SnackBar Handler
  private showSnackBar(message: string, duration = 2500): void {
    this._snackBar.open(message, '', {
      duration,
    });
  }

  //--- Visually censors the first 3 parts of the card number
  public obfuscateCardNbr(cardNbr: string): string {
    const nbrParts = cardNbr.split('-');

    for (let i = 0; i < nbrParts.length - 1; i++) {
      nbrParts[i] = '*'.repeat(4);
    }

    return nbrParts.join('-');
  }

  //--- Returns a logo's path based on a card (bank) type
  public getLogo(type: BankType | CardType): string {
    if (type === CardType.OTHER) return '';
    return `/logos/${type.toLowerCase()}.png`;
  }

  //--- Displays the customer addition form
  public openCustomerForm = (): void => this.customerAddition.emit();

  //--- Displays the card addition form
  public openCardForm = (customer: Customer) => this.cardChange.emit(customer);

  //--- Open dialog Methods
  public openCustomerRemovalDialog(customer: Customer): void {
    const dialogRef = this._dialog.open(RemoveCustomerDialog, {
      data: {
        customer,
      },
    });

    //--- Removes customer upon confirmation
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customersUpdate.emit(this.customersList().filter(c => c.uuid !== customer.uuid));
        this.showSnackBar('Le client a bien été supprimé');
      }
    });
  }

  public openCardPinModifierDialog(card: Card): void {
    const dialogRef = this._dialog.open(ChangePinDialog, {
      height: '345px',
      data: {
        card,
      },
    });

    // Changes card PIN code upon validation
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      const [cardOwnerIndex, currentCardIndex] = card.getIndexes(this.customersList());

      this.customersList()[cardOwnerIndex].cards[currentCardIndex].pin = result;

      this.customersUpdate.emit(this.customersList());
      this.showSnackBar('Le code PIN a bien été changé');
    });
  }

  public openCardRemovalDialog(card: Card): void {
    const dialogRef = this._dialog.open(RemoveCardDialog, {
      data: {
        card,
      },
    });

    // Removes the card upon user validation
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      const cardOwnerIndex = card.getIndexes(this.customersList())[0];

      const filteredCardList = this.customersList()[cardOwnerIndex].cards.filter(
        c => c.cardNumber !== card.cardNumber,
      );

      this.customersList()[cardOwnerIndex].cards = filteredCardList;

      this.customersUpdate.emit(this.customersList());
      this.showSnackBar('La carte a bien été supprimée');
    });
  }
}

// Remove Customer Dialog Component
@Component({
  selector: 'app-dialog-remove-customer',
  templateUrl: 'dialogs/remove-customer.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveCustomerDialog {
  // Injects
  public data = inject<CustomerDialogData>(MAT_DIALOG_DATA);
  public readonly dialogRef = inject(MatDialogRef<RemoveCustomerDialog>);

  // Methods
  public closeDialog(): void {
    this.dialogRef.close();
  }
}

// Change PIN Dialog Component
@Component({
  selector: 'app-dialog-change-pin',
  templateUrl: 'dialogs/change-card-pin.html',
  styleUrl: 'dialogs/change-card-pin.scss',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePinDialog {
  // Injects
  public readonly data = inject<CardDialogData>(MAT_DIALOG_DATA);

  public readonly dialogRef = inject(MatDialogRef<ChangePinDialog>);

  // FormControls
  public pinForm = new FormGroup({
    currentPin: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]{4}/),
      isCurrentPIN(this.data.card.checkPin),
    ]),
    newPin: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{4}/), isCurrentPIN(this.data.card.checkPin, true)]),
  });

  // Mathods
  public closeDialog(): void {
    this.dialogRef.close();
  }
}

// Remove Card Dialog Component
@Component({
  selector: 'app-dialog-remove-card',
  templateUrl: 'dialogs/remove-card.html',
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveCardDialog {
  // Injects
  public readonly dialogRef = inject(MatDialogRef<RemoveCardDialog>);

  // Methods
  public closeDialog(): void {
    this.dialogRef.close();
  }
}
