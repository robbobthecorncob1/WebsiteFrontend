import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { PortfolioService } from './portfolio.service';

/**
 * A Unified Data Resolver for the Portfolio Application.
 * @remarks
 * This resolver acts as a middleware between the Router and the Components. 
 * It intercepts route changes and fetches the necessary data from the 
 * .NET backend BEFORE the destination component is initialized. 
 * @param route - The snapshot of the route being navigated to, used to determine which data to fetch.
 * @returns An Observable containing the data required for the specific route.
 */
export const appResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const portfolioService = inject(PortfolioService);

  switch (route.routeConfig?.path) {
    case 'resume': return forkJoin({skills: portfolioService.getSkills(),jobs: portfolioService.getWorkExperience(),education: portfolioService.getEducation()});
    case 'projects': return portfolioService.getProjects();
    case 'status': return portfolioService.getSystemStatus();
    case '': return portfolioService.getProfile(); 
    default: return of(null); 
  }
};