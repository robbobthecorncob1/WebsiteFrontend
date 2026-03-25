import { Component, inject, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Project } from '../../models/project-experience.model';
import { ActivatedRoute, RouterLink } from '@angular/router';

/**
 * Project Experience Component
 * Renders a list of personal and professional software projects.
 * @remarks
 * This component utilizes the `appResolver` to pre-fetch project data.
 * It also features advanced "deep-linking" capabilities, allowing the application
 * to scroll to and highlight specific projects based on URL fragments (e.g., #project-5).
 */
@Component({
  selector: 'projects',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './project-experience.component.html',
  styleUrl: './project-experience.component.scss',
})
export class ProjectExperienceComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public activeFragment: string | null = null;
  projects$!: Observable<Project[]>;

  /**
   * Initialization:
   * 1. Subscribes to fragment changes to support smooth scrolling to targeted projects.
   * 2. Extracts the pre-resolved project data from the route snapshot.
   */
  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.activeFragment = fragment;
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    });
    this.projects$ = this.route.data.pipe( map(data => data['pageData']));
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