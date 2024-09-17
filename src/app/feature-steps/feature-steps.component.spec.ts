import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureStepsComponent } from './feature-steps.component';

describe('FeatureStepsComponent', () => {
  let component: FeatureStepsComponent;
  let fixture: ComponentFixture<FeatureStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
