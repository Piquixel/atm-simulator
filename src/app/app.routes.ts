import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Atm } from './pages/atm/atm';
import { CardList } from './pages/card-list/card-list';

export const routes: Routes = [
  { path: '', title: 'Accueil', loadComponent: () => Home },
  { path: 'atm', title: 'Simulateur', loadComponent: () => Atm },
  { path: 'card-list', title: 'Cartes', loadComponent: () => CardList },
  { path: '**', redirectTo: '' },
];
