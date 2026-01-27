import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmCardSelection } from './atm-card-selection';

describe('AtmCardSelection', () => {
  let component: AtmCardSelection;
  let fixture: ComponentFixture<AtmCardSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmCardSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmCardSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
