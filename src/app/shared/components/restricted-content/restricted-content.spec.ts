import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedContent } from './restricted-content';

describe('RestrictedContent', () => {
  let component: RestrictedContent;
  let fixture: ComponentFixture<RestrictedContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestrictedContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestrictedContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
