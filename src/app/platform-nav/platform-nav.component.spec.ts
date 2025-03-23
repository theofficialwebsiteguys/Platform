import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformNavComponent } from './platform-nav.component';

describe('PlatformNavComponent', () => {
  let component: PlatformNavComponent;
  let fixture: ComponentFixture<PlatformNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
