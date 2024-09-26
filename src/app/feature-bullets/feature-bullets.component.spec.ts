import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureBulletsComponent } from './feature-bullets.component';

describe('FeatureBulletsComponent', () => {
  let component: FeatureBulletsComponent;
  let fixture: ComponentFixture<FeatureBulletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureBulletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
