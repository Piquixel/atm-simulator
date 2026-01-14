import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Atm } from './pages/atm/atm';
import { CardList } from './pages/card-list/card-list';

export const routes: Routes = [
  { path: '', loadComponent: () => Home },
  { path: 'atm', loadComponent: () => Atm },
  { path: 'card-list', loadComponent: () => CardList },
  { path: '**', redirectTo: '' },
];
