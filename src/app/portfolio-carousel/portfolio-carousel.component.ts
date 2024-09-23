import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-portfolio-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './portfolio-carousel.component.html',
  styleUrl: './portfolio-carousel.component.scss'
})
export class PortfolioCarouselComponent {
  carouselOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000, // Adjust the speed of the slide transition here
    autoplayHoverPause: true,
    slideTransition: 'linear', // Ensures smooth transition
    smartSpeed: 1000, // Adjust the speed of the transition animation
    responsive: {
      0: {
        items: 3 // Number of logos shown at once
      },
      600: {
        items: 5
      },
      1000: {
        items: 7
      }
    }
  };

  logos = [
    'assets/logo-carousel/ltdhype-logo.png',
    'assets/logo-carousel/pcr-logo.png',
    'assets/logo-carousel/amores-logo.png',
    'assets/logo-carousel/ldl-logo.png',
    'assets/logo-carousel/rye-logo.png',
    'assets/logo-carousel/tsstage-logo.webp',
    'assets/logo-carousel/assetace-logo.png',
    'assets/logo-carousel/kings-logo.png',
    'assets/logo-carousel/reyes-logo.png',
    'assets/logo-carousel/annies-logo.avif'
  ];
}
