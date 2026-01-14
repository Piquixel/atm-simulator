import { Component } from '@angular/core';
import { Toolbar } from './components/toolbar/toolbar';

@Component({
  selector: 'app-root',
  imports: [Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public readonly appName = "My super ATM App !"
}
