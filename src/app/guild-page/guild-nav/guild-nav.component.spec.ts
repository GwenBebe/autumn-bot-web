import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildNavComponent } from './guild-nav.component';

describe('GuildNavComponent', () => {
  let component: GuildNavComponent;
  let fixture: ComponentFixture<GuildNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
