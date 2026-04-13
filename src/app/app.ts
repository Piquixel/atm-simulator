import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from 'components/toolbar/toolbar';

@Component({
  selector: 'app-root',
  imports: [Toolbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title: string = "Simulateur ATM"
}
