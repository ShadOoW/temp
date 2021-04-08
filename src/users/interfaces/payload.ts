export interface IPayload {
  email: string;
  password: string;
  username?: string;
  iat?: number;
  expiresIn?: string;
}
