import { Component, inject, OnInit, Input } from '@angular/core';
import { Job } from '../../../models/work-experience.model';
import { ActivatedRoute } from '@angular/router';

/**
 * Work Experience Component is a presentational component that renders a list of professional roles.
 * @remarks
 * It relies on its parent (`ResumeComponent`) to provide an array of {@link Job} objects.
 */
@Component({
  selector: 'work-experience',
  standalone: true,
  templateUrl: './work-experience.component.html'
})
export class WorkExperienceComponent implements OnInit {
  @Input({ required: true }) jobs: Job[] = [];
  
  private route = inject(ActivatedRoute);
  public activeFragment: string | null = null;

  /**
   * Initializes the component and subscribes to URL fragment changes.
   * Logic:
   * 1. Listens for fragments specifically targeting jobs (e.g., #job-2).
   * 2. Uses a small timeout to ensure the DOM is fully rendered before searching for the element.
   * 3. Triggers a "pulse" highlight animation by forcing a browser reflow.
   * 4. Centers the specific job card in the middle.
   */
  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      this.activeFragment = fragment;
      
      if (fragment && fragment.startsWith('job-')) {
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