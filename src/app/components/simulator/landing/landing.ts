import { Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-atm-landing',
  imports: [MatButton],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class AtmLanding {
  public whenNext = output<void>();

  public cardSelection(): void {
    this.whenNext.emit();
  }
}
