import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-feature-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-steps.component.html',
  styleUrl: './feature-steps.component.scss'
})
export class FeatureStepsComponent {
  activeSection: string = 'create';
  sections = ['create', 'connect', 'launch'];
  highlightPosition = 0; // Start at the first section

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.startAutoCarousel();
  }

  startAutoCarousel() {
    const carousel = document.getElementById('featureCarousel');

    if (carousel) {
      carousel.addEventListener('slide.bs.carousel', () => {
        const activeIndex = this.sections.indexOf(this.activeSection);
        const nextIndex = (activeIndex + 1) % this.sections.length;

        this.highlightPosition = nextIndex * 100; // Correctly move the highlight to 0%, 33.33%, 66.66%

        // Update text color and subtext visibility
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
        const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).findIndex(item => item.classList.contains('active'));
        this.activeSection = this.sections[activeIndex];
      });
    }
  }
}
