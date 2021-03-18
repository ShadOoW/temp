// import { IAddress } from '../../types/user';

export interface LoginDto {
  email: string;
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  seller?: boolean;
  address?: string;
}
