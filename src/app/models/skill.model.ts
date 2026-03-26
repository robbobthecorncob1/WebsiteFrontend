import { Course } from "./course.model";
import { Project } from "./project-experience.model";
import { Job } from "./work-experience.model";

/**
 * A specific technical skill and the jobs and projects it was used in.
 */
export interface Skill {
    skillName: string;
    jobsSkillUsed: Job[];
    projectsSkillUsed: Project[];
    coursesSkillUsed: Course[];
}