import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

/**
 * Global Application Configuration for the Angular Portfolio.
 * This object defines the providers and environmental configurations that are 
 * initialized when the application bootstraps. 
 */
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter( routes, withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'enabled'}) ), provideHttpClient()]
}
