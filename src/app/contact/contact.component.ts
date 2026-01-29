import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, Pipe, PipeTransform, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import { PhoneFormatDirective } from '../phone-format.directive';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { AnalyticsService } from '../analytics.service';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

@Pipe({ name: 'safeUrl', standalone: true })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PhoneFormatDirective, SafeUrlPipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [
 trigger('slideInLeft', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-80px)' }),
      animate('900ms cubic-bezier(0.25, 1, 0.5, 1)', 
        style({ opacity: 1, transform: 'translateX(0)' }))
    ]),
    transition('hidden => visible', [
      style({ opacity: 0, transform: 'translateX(-80px)' }),
      animate('900ms cubic-bezier(0.25, 1, 0.5, 1)',
        style({ opacity: 1, transform: 'translateX(0)' }))
    ])
  ]),
  trigger('slideInRight', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(60px)' }),
      animate('800ms 400ms ease-out', 
        style({ opacity: 1, transform: 'translateX(0)' }))
    ]),
    transition('hidden => visible', [
      style({ opacity: 0, transform: 'translateX(60px)' }),
      animate('800ms 400ms ease-out', 
        style({ opacity: 1, transform: 'translateX(0)' }))
    ])
  ])
  ]
})
export class ContactComponent implements OnInit, AfterViewInit {

  contactForm!: FormGroup;
  submitState: SubmitState = 'idle';
  errorMessage = '';

  calendarUrl =
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2i_Epu-g1lHpqePUf7tdFP8aacaKmv5rABEjPGbeonq2CaY4s_Ua02RUbhnRSCVcFCM7TjXcSs?gv=true';

  private formStarted = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private analytics: AnalyticsService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const selectedPlan = sessionStorage.getItem('selectedPlan');

      if (selectedPlan) {
        this.analytics.track('arrived_at_contact_with_plan', {
          plan: selectedPlan
        });
      }
    }

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const section = document.getElementById('contact');
    if (!section) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.analytics.track('contact_form_view');
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    observer.observe(section);
  }

  sendEmail() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitState = 'submitting';
    this.contactForm.disable();

    const value = this.contactForm.getRawValue();
    const formData = new FormData();

    formData.append('businessEmail', 'theofficialwebsiteguys@gmail.com');
    formData.append('name', value.firstName);
    formData.append('email', value.email);

    this.emailService.sendUniversalEmail(formData).subscribe({
      next: () => {
        this.submitState = 'success';
        this.analytics.track('mockup_request', {
          source: 'homepage',
          selected_plan: sessionStorage.getItem('selectedPlan') || 'none'
        });
        this.analytics.track('calendar_viewed', {
          source: 'post_form'
        });
        this.contactForm.reset();
        this.contactForm.enable();
      },
      error: () => {
        this.submitState = 'error';
        this.errorMessage = 'Something went wrong. Please try again.';
        this.contactForm.enable();
      }
    });
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onFormFocus() {
    if (this.formStarted) return;
    this.formStarted = true;

    this.analytics.track('contact_form_start');
  }
  
}
