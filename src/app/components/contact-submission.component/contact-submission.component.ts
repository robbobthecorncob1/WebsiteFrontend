import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ContactSubmission } from '../../models/contact-submission.model';

/**
 * Contact Submission Component provides a robust interface for users to send inquiries via a Reactive Form.
 * @remarks
 * This component handles client-side validation, submission state management 
 * (loading/success/error), and communicates with the backend API via the `PortfolioService`.
 */
@Component({
  selector: 'contact',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './contact-submission.component.html',
  styleUrl: './contact-submission.component.scss'
})
export class ContactSubmissionComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  errorMessage = '';

  /**
   * @param fb - FormBuilder to construct the validated form structure.
   * @param portfolioService - Service used to POST the form data to the backend.
   */
  constructor(private fb: FormBuilder, private portfolioService: PortfolioService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  /**
   * Handles the form submission logic.
   * Logic:
   * 1. Validates form state; if invalid, marks all fields as touched to trigger CSS error styles.
   * 2. Maps form values to the {@link ContactSubmission} model.
   * 3. Sends data to the backend and handles the response stream.
   */
  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); 
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    
    const formData: ContactSubmission = this.contactForm.value;

    this.portfolioService.submitContactForm(formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();

        setTimeout(() => this.submitSuccess = false, 5000);
      },
      error: (err) => {
        console.error('Failed to send message', err);
        this.isSubmitting = false;
        this.errorMessage = 'Oops! Something went wrong sending your message. Please try again.';
      }
    });
  }
}