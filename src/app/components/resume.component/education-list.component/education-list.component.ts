import { Component, Input } from '@angular/core';
import { EducationProgram } from '../../../models/education-list.model';
import { RouterModule } from '@angular/router';

/**
 * Education List Component
 * A presentational component that displays a formatted list of academic degrees and certifications.
 * @remarks
 * It receives its data strictly via Property Binding from the {@link ResumeComponent}.
 */
@Component({
  selector: 'education-list',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.scss']
})
export class EducationListComponent {
  /** 
   * The collection of educational programs to be rendered.
   * This is a required input passed down from the Resume container.
   */
  @Input({ required: true }) educationList: EducationProgram[] = [];
}