import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Profile } from '../../models/profile.model';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

/**
 * Profile Component acts as the primary landing or "About Me" view of the portfolio.
 * @remarks
 * This component displays core identity data including the bio, social links, 
 * and professional summary. It relies on the `appResolver` to ensure that 
 * profile data is fetched from the .NET backend before the component is rendered.
 */
@Component({
  selector: 'app-profile',
  imports: [AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  
  profile$!: Observable<Profile>;

  /**
   * Initialization:
   * Extracts the pre-fetched profile data from the route's data stream.
   */
  ngOnInit(): void {
    const routeData = this.route.data;
    this.profile$ = routeData.pipe(map(data => data['pageData']));
  }
}
