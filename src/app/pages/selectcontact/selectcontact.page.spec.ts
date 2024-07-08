import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectcontactPage } from './selectcontact.page';

describe('SelectcontactPage', () => {
  let component: SelectcontactPage;
  let fixture: ComponentFixture<SelectcontactPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectcontactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
