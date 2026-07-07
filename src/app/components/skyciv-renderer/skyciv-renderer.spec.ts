import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkycivRenderer } from './skyciv-renderer';

describe('SkycivRenderer', () => {
  let component: SkycivRenderer;
  let fixture: ComponentFixture<SkycivRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkycivRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkycivRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
