import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Pipe, PipeTransform, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import { PhoneFormatDirective } from '../phone-format.directive';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';


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
export class ContactComponent {

  contactForm!: FormGroup;
  submitted: boolean = false;
  dragOver: boolean = false;
  uploadedFiles: File[] = [];  // Array to hold the uploaded files
  successMessage: string = ''; // Variable to hold the success message
  animateInfo = false;

  showBooking = false; // toggle after form submit
  bookingLink = 'https://calendar.app.google/c1iP9beZufVVTg3m8'; // your Google booking link

  constructor(
    private readonly fb: FormBuilder, 
    private readonly emailService: EmailService,
    private readonly sanitizer: DomSanitizer, // Import sanitizer to create safe download URLs
    private router: Router,
        private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

ngAfterViewInit() {
  if (isPlatformBrowser(this.platformId)) {
    const section = this.el.nativeElement.querySelector('.contact-section');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animateInfo) {
          this.animateInfo = true; // trigger animation
          observer.unobserve(section); // play only once
        }
      });
    }, { threshold: 0.3 });

    if (section) observer.observe(section);
  }
}


  ngOnInit() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      services: this.fb.group({
        website: [false],
        branding: [false],
        seo: [false],
        mobileApp: [false]
      }),
      projectDetails: ['']
    });
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onImagesChange(event: any) {
    const files = Array.from(event.target.files) as File[]; // Cast to File[]
    if (files.length > 0) {
      // Append new files to the existing uploadedFiles array
      this.uploadedFiles = [...this.uploadedFiles, ...files];
      this.contactForm.patchValue({
        images: this.uploadedFiles
      });
    }
  }
    

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    const files = Array.from(event.dataTransfer?.files || []) as File[]; // Cast to File[]
    if (files.length > 0) {
      // Append new files to the existing uploadedFiles array
      this.uploadedFiles = [...this.uploadedFiles, ...files];
      this.contactForm.patchValue({
        images: this.uploadedFiles
      });
    }
  }

  // Method to remove a file from the uploaded files array
  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1); // Remove file by index
    this.contactForm.patchValue({
      images: this.uploadedFiles // Update the form with the new file list
    });
  }

  // Method to generate a safe download URL for the file
  getFileURL(file: File): SafeUrl {
    const blob = new Blob([file], { type: file.type });
    const url = window.URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(url); // Return a safe URL
  }

  sendEmail() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitted = true;

    const formData = new FormData();
    formData.append('businessEmail', 'theofficialwebsiteguys@gmail.com'); // where the email gets sent
    formData.append('firstName', this.contactForm.get('firstName')?.value);
    formData.append('lastName', this.contactForm.get('lastName')?.value);
    formData.append('email', this.contactForm.get('email')?.value);
    formData.append('phone', this.contactForm.get('phone')?.value);
    formData.append('projectDetails', this.contactForm.get('projectDetails')?.value);

    // Collect selected services
    const services = this.contactForm.get('services')?.value;
    const selectedServices = Object.keys(services)
      .filter(key => services[key])
      .join(', ') || 'None selected';
    formData.append('services', selectedServices);

   this.emailService.sendUniversalEmail(formData).subscribe({
      next: (response) => {
        console.log('Email sent successfully!', response);
        this.successMessage = 'Your message has been sent successfully!';
        this.submitted = false;

        // Instead of redirecting, show booking view
        this.showBooking = true;
      },
      error: (error) => {
        console.error('Error sending email:', error);
        this.submitted = false;
      }
    });
  }
  
}
