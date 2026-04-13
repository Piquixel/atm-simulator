import { Routes } from '@angular/router';
import { Home } from 'pages/home/home';
import { Atm } from 'pages/atm/atm';
import { CardList } from 'pages/card-list/card-list';

export const routes: Routes = [
  { path: '', title: 'Accueil', component: Home },
  { path: 'atm', title: 'Simulateur', component: Atm },
  { path: 'card-list', title: 'Cartes', component: CardList },
  { path: '**', redirectTo: '' },
];
