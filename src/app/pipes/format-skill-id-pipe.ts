import { Pipe, PipeTransform } from '@angular/core';

/**
   * Helper to transform technology names into consistent HTML IDs.
   * Used for generating back-links to the Skills section.
   * @param skillName - The raw name of the technology (e.g., "C#")
   * @returns A kebab-case ID (e.g., "skill-c#")
   */
@Pipe({
  name: 'formatSkillId',
  standalone: true
})
export class FormatSkillIdPipe implements PipeTransform {
  transform(skillName: string): string {
    return 'skill-' + skillName.replace(/\s+/g, '-').toLowerCase();
  }
}
