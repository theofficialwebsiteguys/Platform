import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Step {
  title: string;
  description: string;
  image?: string;
  inputType?: 'text' | 'select' | 'button';
  inputOptions?: string[];
  required?: boolean;
  canSkip?: boolean;
}


@Component({
  selector: 'app-walkthrough',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './walkthrough.component.html',
  styleUrl: './walkthrough.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class WalkthroughComponent {
  @Output() walkthroughComplete = new EventEmitter<void>();
  
  currentStepIndex = 0;
  userResponses: { [key: string]: any } = {}; // Store all responses here
  subscriptionPrice = 0;
  showModal = false; // To control modal visibility

  steps: Step[] = [
    {
      title: '🚀Welcome!🚀',
      description: 'We appreciate you choosing The Website Guys as your partner in digital success. Our mission is to connect you with a dedicated developer who will bring your vision to life, ensuring you receive a high-quality, tailor-made website that meets your business needs. With our expertise, you’ll get a seamless, hassle-free experience and a product that truly stands out.',
      image: 'assets/logos/welcome.svg',
      canSkip: true
    },
    {
      title: 'Business Type',
      description: 'At The Website Guys, we cater to businesses of all sizes—whether you need a sleek single-page website, a dynamic multi-page platform, or a full-scale e-commerce store. Beyond website development, we help elevate your online presence with expert SEO and marketing strategies designed to drive growth and visibility. Our pricing is tailored to your specific needs, ensuring you get the best value for your business. Let us know what you’re looking for, and we’ll craft a solution that fits your vision perfectly!',
      inputType: 'select',
      inputOptions: ['Single-Page Website', 'Multi-Page Website', 'E-commerce shop', 'Mobile Application', 'Sofware Development', 'SEO & Marketing'],
      required: true,
      canSkip: true
    },
    {
      title: '1-on-1 Developer Access',
      description: 'Gain exclusive access to a dedicated 1-on-1 developer who will work closely with you to bring your vision to life. Whether through chat, phone calls, or video meetings, you\'ll have direct communication to discuss your goals, refine your website, and ensure your business thrives online. Get started with a free consultation with our sales team, or subscribe now for full access to your personal developer and real-time collaboration on your project!',
      inputType: 'button',
      required: true,
      canSkip: true
    },
    {
      title: 'Platform Navigation',
      description: 'Here’s a quick tour of the platform to help you navigate.',
      image: 'assets/navigation.svg',
      canSkip: true
    }
  ];

  navSections = [
    { icon: 'fas fa-home', title: 'Home', description: 'Your dashboard for project updates and insights.' },
    { icon: 'fas fa-comments', title: 'Chat', description: 'Communicate directly with your developer and support team.' },
    { icon: 'fas fa-edit', title: 'Editor', description: 'Edit and manage content for your website or application.' },
    { icon: 'fas fa-bell', title: 'Alerts', description: 'Stay updated with important project notifications.' },
    { icon: 'fas fa-cog', title: 'Settings', description: 'Manage your preferences, subscriptions, and configurations.' }
  ];

  nextStep(): void {
    const currentStep = this.steps[this.currentStepIndex];
    if (currentStep.required && !this.userResponses[currentStep.title]) {
      alert('Please complete this step before proceeding.');
      return;
    }

    // If business type is selected, update subscription price for next step
    if (this.currentStepIndex === 1) {
      const selectedBusinessType = this.userResponses['Business Type'];
      if (selectedBusinessType === 'Single-Page Website') {
        this.subscriptionPrice = 20;
      } else if (selectedBusinessType === 'Multi-Page Website') {
        this.subscriptionPrice = 50;
      } else if (selectedBusinessType === 'E-commerce shop') {
        this.subscriptionPrice = 100;
      }
    }

    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
    }
  }

  skipStep(): void {
    if (this.steps[this.currentStepIndex].canSkip) {
      this.currentStepIndex++;
    }
  }

  subscribeNow(): void {
    this.userResponses['1-on-1 Developer Access'] = 'Subscribed'; // Ensure it's recorded
    this.showModal = true;
  }

  continueForFree(): void {
    this.userResponses['1-on-1 Developer Access'] = 'Free Access'; // Ensure it's recorded
    this.nextStep();
  }

  closeModal(): void {
    this.showModal = false;
  }

  finishWalkthrough(): void {
    console.log('User Responses:', this.userResponses);
    this.walkthroughComplete.emit(); 
    // Send `userResponses` to backend
  }
}
