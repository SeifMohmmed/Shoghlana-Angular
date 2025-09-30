import { JobStatus } from '../../Enums/JobStatus/JobStatus';

export interface IClientJob {
  id: number;
  title: string;
  description: string;
  postTime: string;
  maxBudget: number;
  minBudget: number;
  experienceLevel: number;
  skills: any[];
  proposals: any[];
  proposalsCount: number;
  status: JobStatus;
  clientId: number;
  clientName: string;
  acceptedFreelancerId?: number;
  acceptedFreelancerName: any;
  categoryId: number;
  categoryTitle: string;
  rate: any;
}
