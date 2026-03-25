import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Service responsible for managing the application's light/dark color theme.
 * It handles toggling the state, applying the necessary CSS classes to the DOM,
 * and persisting the user's choice in the browser's localStorage.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = false;

  /**
   * Initializes the service and attempts to load any previously saved theme.
   * @param platformId - Injected token used to determine if the code is running in a browser or on a server.
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadTheme();
  }

  /**
   * Flips the current theme state, applies the new theme to the DOM, 
   * and saves the new preference to local storage.
   */
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.saveTheme();
  }

  /**
   * Returns the current theme state.
   * @returns {boolean} True if dark mode is active, false otherwise.
   */
  isDark(): boolean {
    return this.isDarkMode;
  }

  /**
   * Applies the theme by adding or removing the 'dark-theme' class on the body tag.
   * Uses `isPlatformBrowser` to ensure DOM manipulation doesn't crash Angular Server-Side Rendering (SSR).
   */
  private applyTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  }

  /**
   * Checks local storage for a previously saved theme preference.
   * If a user previously selected 'dark', it sets the state and applies it on load.
   * Guarded by `isPlatformBrowser` because `localStorage` does not exist on the server.
   */
  private loadTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isDarkMode = true;
        this.applyTheme();
      }
    }
  }

  /**
   * Saves the user's current theme preference to local storage so it persists 
   * across page reloads and future visits.
   */
  private saveTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }
}