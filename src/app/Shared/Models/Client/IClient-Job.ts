import { JobStatus } from '../../Enums/JobStatus/JobStatus';

export interface IClientJob {
  id: number;
  title: String;
  MinPrice: string;
  MaxPrice: string;
  status: JobStatus;
  clientName: string;
  clientImg: string;
  catID: number;
}
