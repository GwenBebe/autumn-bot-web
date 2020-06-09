import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildPageComponent } from './guild-page.component';

describe('GuildPageComponent', () => {
  let component: GuildPageComponent;
  let fixture: ComponentFixture<GuildPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
