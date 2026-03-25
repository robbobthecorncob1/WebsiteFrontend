/**
 * Details an academic degree, certification, or other educational program.
 */
export interface EducationProgram {
    id: number;
    isComplete: boolean;
    degree: string;
    major?: string;
    school: string;
    college?: string;
    gpa?: number;
    dateStarted?: string;
    dateEnded?: string;
    description: string;
}