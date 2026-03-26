/**
 * Details an academic course.
 */
export interface Course {
    id: number;
    name: string;
    description: string;
    url?: string;
    technologies: string[];
}