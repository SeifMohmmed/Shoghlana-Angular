export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  phoneNumber: string;
  role: number; // e.g. 0 = user, 1 = admin
}
