import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, BehaviorSubject, tap } from 'rxjs';
import { Profile } from '../models/profile.model';
import { Job } from '../models/work-experience.model';
import { Project } from '../models/project-experience.model';
import { EducationProgram } from '../models/education-list.model';
import { SystemStatus } from '../models/system-status.model';
import { ContactSubmission } from '../models/contact-submission.model';
import { Skill } from '../models/skill.model';
import { Course } from '../models/course.model';
import {environment} from '../../environments/environment';

/**
 * Handles all HTTP communication with the .NET backend for the portfolio website.
 * @remarks
 * It acts as the central data provider for the frontend and maintains the application's 
 * awareness of the backend system health.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private statusSubject = new BehaviorSubject<SystemStatus | null>(null);
  public currentStatus$ = this.statusSubject.asObservable();
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /**
   * Retrieves the core profile information for the portfolio owner (name, bio, headline, etc.).
   * @returns An Observable emitting the user's {@link Profile} data.
   */
  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile`);
  }

  /**
   * Retrieves the user's professional work history.
   * @returns An Observable emitting an array of {@link Job} records.
   */
  getWorkExperience(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/experience`);
  }

  /**
   * Retrieves the user's portfolio of completed or ongoing software projects.
   * @returns An Observable emitting an array of {@link Project} records.
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  /**
   * Retrieves the user's technical skills and their associations with specific jobs and projects.
   * @returns An Observable emitting an array of {@link Skill} records.
   */
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`);
  }

  /**
   * Retrieves the user's academic history and educational programs.
   * @returns An Observable emitting an array of {@link EducationProgram} records.
   */
  getEducation(): Observable<EducationProgram[]> {
    return this.http.get<EducationProgram[]>(`${this.apiUrl}/education`);
  }

  /**
   * Retrieves the health and diagnostic status of the backend API and database.
   * @remarks
   * If the API is unreachable, this method catches the error and emits a default "Offline" state.
   * It automatically pushes the new status to the `currentStatus$` stream.
   * @returns An Observable emitting the current {@link SystemStatus}.
   */
  getSystemStatus(): Observable<SystemStatus> {
    return this.http.get<SystemStatus>(`${this.apiUrl}/status`).pipe(
    catchError((error) => {
      console.warn('API is unreachable. Defaulting to offline state.', error);

      return of({
        environment: 'Unknown',
        version: 'Unknown',
        serverTime: new Date().toISOString(),
        uptimeMilliseconds: 0,
        apiStatus: 'Offline',
        databaseStatus: 'Offline'
      } as SystemStatus);
      }), 
      tap((status) => {
        this.statusSubject.next(status);
      })
    );

  }

  /**
   * Submits a new contact form message to the backend for processing and email delivery.
   * @param submission - The user's {@link ContactSubmission} payload (name, email, subject, message).
   * @returns An Observable that resolves when the backend successfully processes the request.
   */
  submitContactForm(submission: ContactSubmission): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, submission);
  }

  /**
   * Retrieves the user's course history.
   * @returns An Observable emitting an array of {@link Course} records.
   */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }
  
}