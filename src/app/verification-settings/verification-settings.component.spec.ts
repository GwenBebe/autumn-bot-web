import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationSettingsComponent } from './verification-settings.component';

describe('VerificationSettingsComponent', () => {
  let component: VerificationSettingsComponent;
  let fixture: ComponentFixture<VerificationSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
