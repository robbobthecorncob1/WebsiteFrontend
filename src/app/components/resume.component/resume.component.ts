import { Component, inject } from '@angular/core';
import { WorkExperienceComponent } from './work-experience.component/work-experience.component';
import { EducationListComponent } from './education-list.component/education-list.component';
import { SkillsComponent } from './skills.component/skills.component';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

/**
 * Resume Container Component is a "Smart Component" (Container Pattern) responsible for managing the 
 * state of the Resume page. It orchestrates the data flow for professional experience, education, and technical skills.
 * @remarks
 * This component extracts the pre-resolved data from the `ActivatedRoute` and passes it down to
 * presentational components via Property Binding.
 */
@Component({
  selector: 'resume',
  standalone: true,
  imports: [WorkExperienceComponent, EducationListComponent, SkillsComponent, AsyncPipe],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent{
  private route = inject(ActivatedRoute);
  resumeData$!: Observable<any>;

  /**
   * Lifecycle hook to initialize the data stream.
   * Maps the global 'pageData' from the Resolver into the local state.
   */
  ngOnInit() {
    this.resumeData$ = this.route.data.pipe(map(data => data['pageData']));
  }
}