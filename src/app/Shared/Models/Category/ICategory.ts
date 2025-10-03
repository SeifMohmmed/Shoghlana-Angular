import { IJob } from '../Job/IJob';

export interface ICategory {
  id: number;
  description: string;
  title: string;
  selected?: boolean;
  jobs?: IJob[];
}
