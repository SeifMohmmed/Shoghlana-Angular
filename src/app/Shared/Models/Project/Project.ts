import { Time } from '@angular/common';
import { ISkill } from '../Skill/Skill';

export interface IProject {
  id: number;
  title: string;
  description: string;
  poster: string;
  skills: ISkill[];
  showSkills?: boolean;
  //link: any;
  //images: any[];
  //timePublished: Time;
  //freelancerId: number;
}
