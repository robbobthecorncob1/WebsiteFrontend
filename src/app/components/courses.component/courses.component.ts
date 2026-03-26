import { Component, inject, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course } from '../../models/course.model';

/**
 * Courses
 * Renders a list of academic courses.
 * @remarks
 * This component utilizes the `appResolver` to pre-fetch project data.
 */
@Component({
  selector: 'courses',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public activeFragment: string | null = null;
  courses$!: Observable<Course[]>;

  /**
   * Initializes the component and sets up data and fragment observers.
   * Logic:
   * 1. Maps the 'pageData' from the route resolver to the courses$ observable.
   * 2. Subscribes to fragment changes to identify when a specific course is being targeted (e.g., #course-5).
   * 3. Uses a delay to ensure the DOM is painted (important when navigating from other pages).
   * 4. Triggers a CSS highlight animation and centers the course card on the screen.
   */
  ngOnInit(): void {
    this.courses$ = this.route.data.pipe( map(data => data['pageData']));

    this.route.fragment.subscribe(fragment => {
      this.activeFragment = fragment;
      
      if (fragment && fragment.startsWith('course-')) {
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

  /**
   * Helper to transform technology names into consistent HTML IDs.
   * Used for generating back-links to the Skills section.
   * @param skillName - The raw name of the technology (e.g., "C#")
   * @returns A kebab-case ID (e.g., "skill-c#")
   */
  formatSkillId(skillName: string): string {
    return 'skill-' + skillName.replace(/\s+/g, '-').toLowerCase();
  }
}