import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMovieComponent } from './schedule-movie.component';

describe('ScheduleMovieComponent', () => {
  let component: ScheduleMovieComponent;
  let fixture: ComponentFixture<ScheduleMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
