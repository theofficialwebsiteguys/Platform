import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePortfolioComponent } from './feature-portfolio.component';

describe('FeaturePortfolioComponent', () => {
  let component: FeaturePortfolioComponent;
  let fixture: ComponentFixture<FeaturePortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
