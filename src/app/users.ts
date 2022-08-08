export interface UserLogin {
  email: string;
  password: string;
}
export interface UserSignup {
  username: string;
  email: string;
  password: string;
  name: string;
  age: number;
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
