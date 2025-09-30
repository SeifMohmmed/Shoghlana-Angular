export interface IProposal {
  id: number;
  approvedTime: string;
  deadline: string;
  description: string;
  price: number;
  reposLinks: string[];
  images: string[];
  freelancerId: number;
  freelancerName: string;
  freelancerTitle: string;
  jobId: number;
  status: number;
  jobTitle: string;
  clientName: string;
}
