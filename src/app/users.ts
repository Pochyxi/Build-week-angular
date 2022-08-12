export interface UserLogin {
  email: string;
  password: string;
}
export interface UserSignup {
  username: string;
  email: string;
  password: string;
  nome: string;
  eta: number;
  friends: User[];
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}
export interface User {
  username: string;
  email: string;
  password: string;
  nome: string;
  eta: number;
  id: number | string | null;
  friends: User[];
}
