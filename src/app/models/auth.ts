export interface AuthDTO {
  username: string;
  password: string;
}

export type AuthType = 'login' | 'register';
