import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { SystemStatus } from '../../models/system-status.model';

/**
 * System Status Component
 * Provides a real-time health dashboard for the .NET backend API and Database.
 * @remarks
 * This component initializes using data from the `appResolver` but maintains
 * a local "heartbeat" timer to simulate a real-time uptime clock without 
 * overloading the server with constant requests.
 */
@Component({
  selector: 'app-system-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-status.component.html',
  styleUrl: './system-status.component.scss'
})
export class SystemStatusComponent implements OnInit, OnDestroy {
  statusData!: SystemStatus;
  currentUptimeMs: number = 0;
  private timerRef: any;

  constructor(private route: ActivatedRoute, private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  /**
   * Initialization:
   * 1. Grabs the pre-fetched status from the route resolver.
   * 2. Starts the local ticker based on the server's reported uptime.
   */
  ngOnInit(): void {
    this.statusData = this.route.snapshot.data['pageData'];
    this.startClock(this.statusData.uptimeMilliseconds);
  }

  /**
   * Ensures the interval timer is killed when the user navigates away.
   */
  ngOnDestroy(): void {
    if (this.timerRef) clearInterval(this.timerRef);
  }

  /**
   * Forces a manual fetch from the PortfolioService to get the latest 
   * hardware/database status and resets the local clock to match the server.
   */
  refreshStatus(): void {
    this.portfolioService.getSystemStatus().subscribe({
      next: (freshData) => {
        this.statusData = freshData;
        this.startClock(freshData.uptimeMilliseconds);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to refresh status', err)
    });
  }

  /**
   * Sets up a 1-second interval to increment the uptime counter.
   * @param initialMs - The starting uptime value (usually from the server).
   */
  private startClock(initialMs: number): void {
    if (this.timerRef) clearInterval(this.timerRef);
    
    this.currentUptimeMs = initialMs;

    this.timerRef = setInterval(() => {
      this.currentUptimeMs += 1000;
      this.cdr.detectChanges()
    }, 1000);
  }

  /**
   * Helper to transform raw milliseconds into a human-readable duration.
   * @param ms - Duration in milliseconds.
   * @returns Formatted string (e.g., "2d 5h 10m" or "45s").
   */
  formatUptime(ms: number): string {
    if (!ms) return '0s';

    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    
    return `${seconds}s`;
  }
}