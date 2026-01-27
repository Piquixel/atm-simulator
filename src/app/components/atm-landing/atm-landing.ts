import { Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-atm-landing',
  imports: [MatButton],
  templateUrl: './atm-landing.html',
  styleUrl: './atm-landing.scss',
})
export class AtmLanding {
  public onNext = output<void>();

  public cardSelection(): void {
    this.onNext.emit();
  }
}
