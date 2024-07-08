import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserChatPage } from './user-chat.page';

describe('UserChatPage', () => {
  let component: UserChatPage;
  let fixture: ComponentFixture<UserChatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
