import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import { PhoneFormatDirective } from '../phone-format.directive';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PhoneFormatDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactForm!: FormGroup;
  submitted: boolean = false;
  dragOver: boolean = false;
  uploadedFiles: File[] = [];  // Array to hold the uploaded files
  successMessage: string = ''; // Variable to hold the success message

  constructor(
    private readonly fb: FormBuilder, 
    private readonly emailService: EmailService,
    private readonly sanitizer: DomSanitizer // Import sanitizer to create safe download URLs
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]],
      serviceType: ['', Validators.required],  // Updated to match the form template
      proposal: ['', Validators.required],
      images: [null]
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
      // Mark all fields as touched to trigger validation errors
      this.contactForm.markAllAsTouched();
      return; // Prevent form submission if invalid
    }

    this.submitted = true; // Set to true to show the spinner and disable the button

    const formData = new FormData();
    formData.append('name', this.contactForm.get('name')?.value);
    formData.append('email', this.contactForm.get('email')?.value);
    formData.append('phone', this.contactForm.get('phone')?.value);
    formData.append('serviceType', this.contactForm.get('serviceType')?.value);
    formData.append('proposal', this.contactForm.get('proposal')?.value);

    const files: File[] = this.contactForm.get('images')?.value;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('images[]', files[i]);
      }
    }

    this.emailService.sendEmail(formData).subscribe(
      response => {
        console.log('Email sent successfully!', response);
        this.successMessage = 'Your website template request has been submitted successfully!';
        this.contactForm.reset();
        this.uploadedFiles = [];  // Clear uploaded files
        this.submitted = false; // Reset the submitted flag
      },
      error => {
        console.error('Error sending email:', error);
        this.submitted = false; // Reset the submitted flag even if there's an error
      }
    );
  }
  
}
