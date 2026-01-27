import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmActionsMenu } from './atm-actions-menu';

describe('AtmActionsMenu', () => {
  let component: AtmActionsMenu;
  let fixture: ComponentFixture<AtmActionsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmActionsMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmActionsMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
