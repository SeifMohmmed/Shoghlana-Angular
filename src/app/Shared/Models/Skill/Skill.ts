export interface ISkill {
  id: number;

  title: string;

  description: string;

  // TODO : should make 3 int lists for the projectsIDs and the JobsIDs and the FreelancersIDs that have this skill

  freelancersIDs?: number[];

  jobsIDs?: number[];

  projectsIDs?: number[];
}
