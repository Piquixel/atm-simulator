import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-pad',
  imports: [MatGridList, MatButtonModule, MatGridTile],
  templateUrl: './pad.html',
  styleUrl: './pad.scss',
})
export class Pad {
  public readonly validatePin = output<string>();
  public readonly tiles = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '0', 'V'];
  public pin = '';

  handleClick(value: string): void {
    switch (value) {
      case 'X':
        this.pin = '';
        break;
      case 'V':
        if(this.pin.length === 4) {
          this.validatePin.emit(this.pin);
        }
        break;
      default: {
        if (this.pin.length < 4) {
          this.pin += value;
        }
        break;
      }
    }
  }
}
