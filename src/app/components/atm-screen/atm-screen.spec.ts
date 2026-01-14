import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmScreen } from './atm-screen';

describe('AtmScreen', () => {
  let component: AtmScreen;
  let fixture: ComponentFixture<AtmScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
