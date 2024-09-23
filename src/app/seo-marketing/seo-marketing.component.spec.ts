import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoMarketingComponent } from './seo-marketing.component';

describe('SeoMarketingComponent', () => {
  let component: SeoMarketingComponent;
  let fixture: ComponentFixture<SeoMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeoMarketingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeoMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
