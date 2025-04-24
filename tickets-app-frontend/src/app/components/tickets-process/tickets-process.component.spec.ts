import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsProcessComponent } from './tickets-process.component';

describe('TicketsProcessComponent', () => {
  let component: TicketsProcessComponent;
  let fixture: ComponentFixture<TicketsProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
