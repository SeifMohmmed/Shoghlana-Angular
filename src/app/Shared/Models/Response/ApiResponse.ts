export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message?: string;
  status: number;
  token: any;
  expired: any;
}
