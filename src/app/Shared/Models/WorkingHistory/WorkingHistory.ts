import { IRate } from '../Rate/Rate';

export interface IWorkingHistory {
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
  status: number;
  clientId: number;
  clientName: any;
  acceptedFreelancerId: number;
  acceptedFreelancerName: string;
  categoryId: number;
  categoryTitle: string;
  rate?: IRate;
}
