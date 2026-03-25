import { Component, inject, OnInit, Input } from '@angular/core';
import { Job } from '../../../models/work-experience.model';
import { ActivatedRoute } from '@angular/router';

/**
 * Work Experience Component is a presentational component that renders a list of professional roles.
 * @remarks
 * It relies on its parent (`ResumeComponent`) to provide an array of {@link Job} objects.
 * It maintains internal logic for fragment-based scrolling and highlighting.
 */
@Component({
  selector: 'work-experience',
  standalone: true,
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.scss',
})
export class WorkExperienceComponent implements OnInit {
  @Input({ required: true }) jobs: Job[] = [];
  
  private route = inject(ActivatedRoute);
  public activeFragment: string | null = null;

  /**
   * Initialization:
   * Subscribes to the route fragment. If a fragment exists (e.g., when 
   * navigating from a Skill card), it updates the local state and 
   * triggers a smooth scroll to the specific element.
   */
  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.activeFragment = fragment;
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100); 
      }
    });
  }
}