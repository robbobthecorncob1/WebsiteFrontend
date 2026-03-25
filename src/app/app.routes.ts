import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile.component/profile.component';
import { ResumeComponent } from './components/resume.component/resume.component';
import { ProjectExperienceComponent } from './components/project-experience.component/project-experience.component';
import { SystemStatusComponent } from './components/system-status/system-status.component';
import { ContactSubmissionComponent } from './components/contact-submission.component/contact-submission.component';
import { appResolver } from './services/resolver.service';

/**
 * Global Route Configuration for the Portfolio Application.
 * * @remarks
 * Most routes utilize the `appResolver` via the `resolve` block. 
 * This ensures that the required data (Profile, Resume, Projects, etc.) is 
 * fetched from the backend API before the route transition completes, 
 * preventing "flicker" and ensuring components have immediate access to data.
 */
export const routes: Routes = [
  { path: '', component: ProfileComponent, resolve: { pageData: appResolver } },
  { path: 'resume', component: ResumeComponent, resolve: { pageData: appResolver } },
  { path: 'projects', component: ProjectExperienceComponent, resolve: { pageData: appResolver } },
  { path: 'contact', component: ContactSubmissionComponent },
  { path: 'status', component: SystemStatusComponent, resolve: { pageData: appResolver } },
  { path: '**', redirectTo: '' }
];