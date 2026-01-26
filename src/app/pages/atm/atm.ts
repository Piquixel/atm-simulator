import { Component } from '@angular/core';
import { AtmScreen } from '../../components/atm-screen/atm-screen';

@Component({
  selector: 'app-atm',
  imports: [AtmScreen],
  templateUrl: './atm.html',
  styleUrl: './atm.scss',
})
export class Atm {}
