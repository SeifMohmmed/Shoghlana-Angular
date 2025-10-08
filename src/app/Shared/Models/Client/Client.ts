import { IClientJob } from './IClient-Job';

export interface IClient {
  id: number;
  name: string;
  description: string;
  phone?: string;
  country: string;
  image: File;
  registerationTime: string;
  jobsCount: number;
  completedJobsCount: number;
  jobs: IClientJob[];
}
