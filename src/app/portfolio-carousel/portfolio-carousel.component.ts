import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-portfolio-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './portfolio-carousel.component.html',
  styleUrl: './portfolio-carousel.component.scss'
})
export class PortfolioCarouselComponent implements AfterViewInit {
  isBrowser: boolean;

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    slideTransition: 'linear',
    smartSpeed: 1000,
    responsive: {
      0: { items: 3 },
      600: { items: 5 },
      1000: { items: 7 }
    }
  };

  logos: string[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
   if (this.isBrowser) {
      setTimeout(() => {
        const logos = [
          'assets/logo-carousel/48-volt.png',
          'assets/logo-carousel/best-diner-logo.png',
          'assets/logo-carousel/cake-logo.png',
          'assets/logo-carousel/cannaos-logo.png',
          'assets/logo-carousel/flower-power-logo.png',
          'assets/logo-carousel/ibiza-projects-logo.png',
          'assets/logo-carousel/kevcleanedit.png',
          'assets/logo-carousel/opmf-logo.png',
          'assets/logo-carousel/stony-point-logo.png',
          'assets/logo-carousel/pcr-logo.png',
          'assets/logo-carousel/amores-logo.png',
          'assets/logo-carousel/ldl-logo.png',
          'assets/logo-carousel/rye-logo.png',
          'assets/logo-carousel/tsstage-logo.webp',
          'assets/logo-carousel/assetace-logo.png',
          'assets/logo-carousel/reyes-logo.png',
          'assets/logo-carousel/annies-logo.avif',
        ];

        this.logos = this.shuffleArray(logos);
      }, 0);
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]; // clone to avoid mutating original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

}
