import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSettingsComponent } from './welcome-settings.component';

describe('WelcomeSettingsComponent', () => {
  let component: WelcomeSettingsComponent;
  let fixture: ComponentFixture<WelcomeSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeSettingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
