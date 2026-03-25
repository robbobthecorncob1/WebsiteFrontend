import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Skill } from '../../../models/skill.model';

/**
 * Extended Skill interface to manage UI-specific state (flipping).
 */
interface SkillUI extends Skill {
  isFlipped?: boolean;
}

/**
 * Skills Presentational Component
 * Renders a grid of interactive "Skill Cards" that can flip to reveal related experience.
 * @remarks
 * This component receives its data from the Resume parent. 
 * It handles its own internal animations, state-based card flipping, and fragment-based scrolling logic.
 */
@Component({
  selector: 'skills',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills: SkillUI[] = [];
  public activeFragment: string | null = null;

  /**
   * Data Input Setter
   * Intercepts the raw data from the parent and transforms it into 
   * the UI-ready `SkillUI` format with a default 'flipped' state of false.
   */
  @Input({ required: true }) set initialSkills(data: Skill[]) {
    if (data) this.skills = data.map((skill) => ({...skill,isFlipped: false }));
  }
  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  /**
   * Initializes the component and sets up a subscription to the URL fragment.
   * Logic:
   * 1. Listens for fragment changes (e.g., #skill-angular).
   * 2. If the fragment matches a skill, it flips that card.
   * 3. Triggers a "pulse" highlight animation and centers the element.
   */
  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string | null) => {
      this.activeFragment = fragment;
      
      if (fragment && fragment.startsWith('skill-')) {
        if (this.skills.length > 0) {
          this.skills = this.skills.map(skill => ({
            ...skill, 
            isFlipped: this.formatSkillId(skill.skillName) === fragment
          }));
          this.cdr.detectChanges(); 
        }

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
   * Manages navigation from the back of a skill card to a specific Work Experience entry.
   * @param elementId - The ID of the job element to scroll to (e.g., 'job-1').
   * @param event - The click event from the template.
   * @remarks
   * This method handles a specific edge case: if the user is already on the target fragment,
   * Angular's router will not emit a change. We manually trigger the highlight and scroll
   * logic here to ensure the UI remains responsive to repeat clicks.
   */
  handleJobClick(elementId: string, event: Event): void {
    event.stopPropagation();
    if (this.route.snapshot.fragment === elementId) {
      event.preventDefault(); 
      
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.remove('active-target');
        void element.offsetWidth;
        element.classList.add('active-target');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  /**
   * Manually toggles the flip state of a skill card on user click.
   * @param skill - The SkillUI card object to flip.
   */
  toggleFlip(skill: SkillUI): void {
    skill.isFlipped = !skill.isFlipped;
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