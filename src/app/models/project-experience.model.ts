/**
 * Details a personal, academic, or professional software project.
 */
export interface Project {
    id: number;
    isComplete?: boolean;
    name: string;
    technologies: string[];
    description: string;
    repoURL?: string;
    dateStarted?: string;
    dateEnded?: string;
}