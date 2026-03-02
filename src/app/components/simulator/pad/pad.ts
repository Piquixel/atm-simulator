// Imports
import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// Main Component
@Component({
  selector: 'app-pad',
  imports: [MatGridList, MatButtonModule, MatGridTile, MatIcon, MatFormFieldModule, MatInput, ReactiveFormsModule],
  templateUrl: './pad.html',
  styleUrl: './pad.scss',
})
export class Pad {
  // Outputs
  public readonly validatePin = output<string>();

  // FormControls
  public pinControl = new FormControl('')

  // Properties
  public readonly tiles: (number|string)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'close', 0, 'check'];

  // Methods
  public handleClick(value: string | number): void {
    let pin = this.pinControl.value
    if (!pin) pin = ''
    switch (value) {
      case 'close':
        this.pinControl.reset()
        break;
      case 'check':
        if(pin.length === 4) {
          this.validatePin.emit(pin);
        }
        break;
      default: {
        if (pin.length < 4) {
          this.pinControl.setValue(pin + value)
        }
        break;
      }
    }
  }
}
