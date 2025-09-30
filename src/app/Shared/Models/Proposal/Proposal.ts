import { ProposalStatus } from '../../Enums/ProposalStatus/ProposalStatus';
import { IProposalImage } from './ProposalImage';

export interface IProposal {
  id: number;
  approvedTime: string; // known when the client approves
  deadline?: string; // calulated after approve
  duration: number; // given from the freelancer
  status: ProposalStatus;
  description: string;
  reposLinks?: string[];
  images?: IProposalImage[];
  price: number;
  freelancerId: number;
  freelancerName: string;
  freelancerTitle: string;
  jobId: number;
  jobTitle: string;
  clientName: string;
}
