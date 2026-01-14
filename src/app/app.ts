import { Component } from '@angular/core';
import { Toolbar } from './components/toolbar/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Toolbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public readonly appName = "My super ATM App !"
}
