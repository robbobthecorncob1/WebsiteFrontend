/**
 * Represents a professional position held and its information.
 */
export interface Job {
    id: number;
    isCurrentJob?: boolean;
    position: string;
    company: string;
    technologies: string[];
    dateStarted: string;
    dateEnded?: string;
    description: string;
}