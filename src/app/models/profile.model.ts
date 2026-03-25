/**
 * Represents a link to a professional or social media platform (e.g., GitHub, LinkedIn).
 */
export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

/**
 * The primary personal information and metadata for the portfolio owner.
 */
export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  headline: string;
  bio: string;
  skills: string[];
  socialLinks: SocialLink[];
}