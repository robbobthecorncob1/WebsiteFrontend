import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { SystemStatus } from './models/system-status.model';
import { PortfolioService } from './services/portfolio.service';
import { CommonModule } from '@angular/common';

/**
 * The Root Component of the application.
 * This component serves as the main layout shell, containing the global navigation,
 * the router outlet for page content, and the global footer. It is also responsible
 * for initializing the global system health check.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  status$!: Observable<SystemStatus | null>;
  protected readonly title = signal('website-frontend');
  
  /**
   * @param portfolioService Injected service to handle global API health monitoring.
   */
  constructor(private portfolioService: PortfolioService) {}

  /**
   * Component initialization.
   * Sets up the status stream and triggers the initial system status check.
   * Note: The explicit .subscribe() is necessary here as this global check
   * updates a BehaviorSubject used by multiple components.
   */
  ngOnInit(): void {
    this.status$ = this.portfolioService.currentStatus$;
    this.portfolioService.getSystemStatus().subscribe();
  }
}
