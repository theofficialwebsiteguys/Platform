import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-feature-steps',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature-steps.component.html',
  styleUrl: './feature-steps.component.scss',
  animations: [
    trigger('fadeIn', [
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms ease-out')
      ])
  ])
  ]
})
export class FeatureStepsComponent {
  activeStep = 0;

  steps = [
    {
      title: 'Connect',
      subtitle: 'Talk directly with your Website Guy',
      heading1: 'Start with a Free Call,',
      heading2: 'No Pressure — Just Strategy',
      description:
        'We’ll look at your business, your goals, and your current web presence. Together, we’ll outline exactly what you need — and how we can make it happen.',
      cta: 'Book Your Free Call',
      image: 'assets/connect.jpg',
    },
    {
      title: 'Design',
      subtitle: 'Your vision, brought to life',
      heading1: 'Custom Designs,',
      heading2: 'Built Around Your Brand',
      description:
        'We turn your ideas into a clean, modern design that works on every screen. No templates — just something that feels uniquely yours and drives real results.',
      cta: 'Start Your Design',
      image: 'assets/design.jpg',
    },
    {
      title: 'Launch',
      subtitle: 'Get live and start growing',
      heading1: 'Launch with Confidence,',
      heading2: 'Built for Real Performance',
      description:
        'From hosting to optimization, we handle everything so you can focus on running your business. Your site goes live fast, secure, and ready to grow.',
      cta: 'Launch My Site',
      image: 'assets/launch.jpg',
    },
  ];
}
