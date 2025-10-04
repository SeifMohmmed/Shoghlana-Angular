import { ExperienceLevel } from '../../Enums/ExperienceLevel/ExperienceLevel';
import { JobStatus } from '../../Enums/JobStatus/JobStatus';
import { ICategory } from '../Category/ICategory';
import { IFreelancer } from '../Freelancers/IFreelancer';
import { IProposal } from '../Proposal/Proposal';
import { IRate } from '../Rate/Rate';
import { ISkill } from '../Skill/Skill';

export interface IJob {
  id: number;
  title: string;
  description: string;
  postTime?: string;
  formattedPostTime?: string;
  price: string;
  maxBudget: number;
  minBudget: number;
  imgURL: string;
  experienceLevel: ExperienceLevel;
  status: JobStatus;
  skills: ISkill[];
  proposals?: IProposal[];
  freelancers?: IFreelancer[];
  freelancerName: string;
  poster: string; // doesn't exist in the API models => just added it here to display a default img
  acceptedFreelancerId?: number;
  acceptedFreelancerName?: string;
  freelancerImg?: string;
  clientId: number;
  clientName: string;
  clientImage: string;
  categoryId: number;
  category: ICategory;
  categoryTitle?: string;
  proposalsCount: number;
  rate?: IRate;
  showFeedback?: boolean;
}
