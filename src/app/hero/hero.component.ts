import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  constructor(private analytics: AnalyticsService) {}

  scrollTo(id: string) {
    // 🔥 TRACK HERO CTA CLICK
    this.analytics.track('hero_cta_click', {
      cta_text: 'Get a Free Website Mockup',
      location: 'hero'
    });

    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -80;
    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}
