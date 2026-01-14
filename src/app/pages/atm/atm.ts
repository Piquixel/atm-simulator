import { Component } from '@angular/core';
import { PinPad } from '../../components/pin-pad/pin-pad';
import { AtmScreen } from '../../components/atm-screen/atm-screen';

@Component({
  selector: 'app-atm',
  imports: [PinPad, AtmScreen],
  templateUrl: './atm.html',
  styleUrl: './atm.scss',
})
export class Atm {

}
