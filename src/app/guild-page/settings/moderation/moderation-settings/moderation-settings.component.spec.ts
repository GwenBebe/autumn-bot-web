import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationSettingsComponent } from './moderation-settings.component';

describe('ModerationSettingsComponent', () => {
  let component: ModerationSettingsComponent;
  let fixture: ComponentFixture<ModerationSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModerationSettingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
