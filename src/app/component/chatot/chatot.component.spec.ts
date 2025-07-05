import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatotComponent } from './chatot.component';

describe('ChatotComponent', () => {
  let component: ChatotComponent;
  let fixture: ComponentFixture<ChatotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatotComponent]
    });
    fixture = TestBed.createComponent(ChatotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
