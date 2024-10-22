import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSuccessDialogComponent } from './profile-success-dialog.component';

describe('ProfileSuccessDialogComponent', () => {
  let component: ProfileSuccessDialogComponent;
  let fixture: ComponentFixture<ProfileSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSuccessDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
