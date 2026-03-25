/**
 * Represents the payload sent by a visitor through the portfolio's contact form.
 */
export interface ContactSubmission {
    name: string;
    email: string;
    subject: string;
    message: string;
}