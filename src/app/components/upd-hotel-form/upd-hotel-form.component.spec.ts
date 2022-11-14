import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdHotelFormComponent } from './upd-hotel-form.component';

describe('UpdHotelFormComponent', () => {
  let component: UpdHotelFormComponent;
  let fixture: ComponentFixture<UpdHotelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdHotelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdHotelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
