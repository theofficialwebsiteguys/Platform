import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feature-steps',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature-steps.component.html',
  styleUrl: './feature-steps.component.scss'
})
export class FeatureStepsComponent {
  activeSection: string = 'connect';
  sections = ['connect', 'design', 'launch'];
  highlightPosition = 0;
  private isBrowser: boolean;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startAutoCarousel();
    }
  }

  startAutoCarousel() {
    const carousel = document.getElementById('featureCarousel');
    if (!carousel) return;

    carousel.addEventListener('slide.bs.carousel', () => {
      const activeIndex = this.sections.indexOf(this.activeSection);
      const nextIndex = (activeIndex + 1) % this.sections.length;
      this.highlightPosition = nextIndex * 100;

      document.querySelectorAll('.header-text .text').forEach((element, index) => {
        if (index === nextIndex) {
          this.renderer.addClass(element, 'active-text');
        } else {
          this.renderer.removeClass(element, 'active-text');
        }
      });

      document.querySelectorAll('.subtext-frame').forEach((element, index) => {
        if (index === nextIndex) {
          this.renderer.addClass(element, 'active-subtext');
        } else {
          this.renderer.removeClass(element, 'active-subtext');
        }
      });
    });

    carousel.addEventListener('slid.bs.carousel', () => {
      const items = carousel.querySelectorAll('.carousel-item');
      const activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
      if (activeIndex !== -1) {
        this.activeSection = this.sections[activeIndex];
      }
    });
  }
}
