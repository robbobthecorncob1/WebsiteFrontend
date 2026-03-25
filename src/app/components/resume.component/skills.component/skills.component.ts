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
   * Initialization:
   * Subscribes to route fragments to support deep-linking.
   */
  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string | null) => {
      this.activeFragment = fragment;
      if (this.skills && this.skills.length > 0) setTimeout(() => this.checkAndScrollToFragment(), 100);
    });
  }

  /**
   * Handles state-driven UI updates when a specific skill is targeted via URL fragment.
   * Logic:
   * 1. Updates the `isFlipped` state to reveal the back of the card.
   * 2. Calculates the scroll position with a 100px offset for the site header.
   */
  private checkAndScrollToFragment(): void {
    if (this.activeFragment && this.activeFragment.startsWith('skill-')) {
      if (this.skills && this.skills.length > 0) {
        this.skills = this.skills.map(skill => ({...skill, isFlipped: this.formatSkillId(skill.skillName) === this.activeFragment}));
        this.cdr.detectChanges(); 
      }

      setTimeout(() => {
        const element = document.getElementById(this.activeFragment!);
        
        if (element) {   
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  }

  /**
   * Manually toggles the flip state of a skill card on user click.
   */
  toggleFlip(skill: SkillUI): void {
    skill.isFlipped = !skill.isFlipped;
  }

  /**
   * Prevents the card from flipping back over when the user clicks 
   * a link on the back of the card (e.g., a link to a specific job).
   */
  scrollToJob(elementId: string, event: Event): void {
    event.stopPropagation(); 
  }
  
  /**
   * Formats skill names into valid HTML IDs.
   * Example: "C#" -> "skill-c#"
   */
  formatSkillId(skillName: string): string {
    return 'skill-' + skillName.replace(/\s+/g, '-').toLowerCase();
  }
}