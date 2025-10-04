import { ISkill } from '../Skill/Skill';

export interface IAddProject {
  id: number;
  title: string;
  description: string;
  minBudget: number;
  maxBudget: number;
  durationInDays: number;
  skills: ISkill;
}
