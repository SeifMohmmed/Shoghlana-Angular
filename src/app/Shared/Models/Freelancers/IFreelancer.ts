import { IPortfolio } from '../Portfolio/Portfolio';
import { ISkill } from '../Skill/Skill';
import { IWorkingHistory } from '../WorkingHistory/WorkingHistory';

export interface IFreelancer {
  id: number;
  name: string;
  title: string;
  skills: ISkill[];
  skillsIds: number[];
  address: string;
  personalImageBytes: string | File;
  overView: string;
  portfolio: IPortfolio[];
  workingHistory: IWorkingHistory[];
  //proposals: any;
}
