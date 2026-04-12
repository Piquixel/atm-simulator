import { Component } from '@angular/core';
import { AtmComponent } from 'components/simulator/container/container';

@Component({
  selector: 'app-atm',
  imports: [AtmComponent],
  templateUrl: './atm.html',
  styleUrl: './atm.scss',
})
export class Atm {}
