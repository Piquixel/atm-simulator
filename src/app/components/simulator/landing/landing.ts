// Imports
import { Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';

// Main Component
@Component({
  selector: 'app-atm-landing',
  imports: [MatButton],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class AtmLanding {
  // Outputs
  public readonly selectCard = output<void>();

  // Methods
  public cardSelection(): void {
    this.selectCard.emit();
  }
}
