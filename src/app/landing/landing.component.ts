import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { FeatureStepsComponent } from '../feature-steps/feature-steps.component';
import { Feature3Component } from '../feature-3/feature-3.component';
import { ContactComponent } from '../contact/contact.component';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, HeroComponent, FeatureStepsComponent, Feature3Component, ContactComponent, FaqSectionComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  

}
