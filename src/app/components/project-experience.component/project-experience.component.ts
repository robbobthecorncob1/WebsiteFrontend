import { Component, inject, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Project } from '../../models/project-experience.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormatSkillIdPipe } from '../../pipes/format-skill-id-pipe'
/**
 * Project Experience Component
 * Renders a list of personal and professional software projects.
 * @remarks
 * This component utilizes the `appResolver` to pre-fetch project data.
 */
@Component({
  selector: 'projects',
  imports: [AsyncPipe, RouterLink, FormatSkillIdPipe],
  templateUrl: './project-experience.component.html'
})
export class ProjectExperienceComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public activeFragment: string | null = null;
  projects$!: Observable<Project[]>;

  /**
   * Initializes the component and sets up data and fragment observers.
   * Logic:
   * 1. Maps the 'pageData' from the route resolver to the projects$ observable.
   * 2. Subscribes to fragment changes to identify when a specific project is being targeted (e.g., #project-5).
   * 3. Uses a delay to ensure the DOM is painted (important when navigating from other pages).
   * 4. Triggers a CSS highlight animation and centers the project card on the screen.
   */
  ngOnInit(): void {
    this.projects$ = this.route.data.pipe( map(data => data['pageData']));

    this.route.fragment.subscribe(fragment => {
      this.activeFragment = fragment;
      
      if (fragment && fragment.startsWith('project-')) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.classList.remove('active-target');
            void element.offsetWidth;
            element.classList.add('active-target');
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    });
  }
}