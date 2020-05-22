import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadUserComponent } from './read-user.component';

describe('ReadUserComponent', () => {
  let component: ReadUserComponent;
  let fixture: ComponentFixture<ReadUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
