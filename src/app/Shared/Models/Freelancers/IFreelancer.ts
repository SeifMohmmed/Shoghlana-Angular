import { IPortfolio } from '../Portfolio/Portfolio';
import { IWorkingHistory } from '../WorkingHistory/WorkingHistory';

export interface IFreelancer {
  id: number;
  personalImageBytes: any;
  name: string;
  title: string;
  address: string;
  overView: string;
  portfolio: IPortfolio[];
  workingHistory: IWorkingHistory[];
  proposals: any;
  skills: any[];
}
