import { Component } from '@angular/core';
import { CardsContainer } from 'components/cards/container/container.js';

@Component({
  selector: 'app-card-list',
  imports: [CardsContainer],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {}
