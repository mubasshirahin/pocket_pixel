import type { GoogleSignInPayload, SignInPayload, SignUpPayload, User } from '@expense-tracker/shared';
import ApiClient from './ApiClient';

export interface AuthResponse extends User {
  token: string;
  avatar: string;
  name: string;
  email: string;
  id: string;
}

export default class AuthApi extends ApiClient {
  constructor(baseURL: string) {
    super(`${baseURL}/auth`);
  }

  signUp(payload: SignUpPayload): Promise<AuthResponse> {
    return this.post<AuthResponse>('/sign-up', payload);
  }

  signIn(payload: SignInPayload): Promise<AuthResponse> {
    return this.post<AuthResponse>('/sign-in', payload);
  }

  signOut(): Promise<{ message: string }> {
    return this.post('/sign-out');
  }

  google(credential: string): Promise<AuthResponse> {
    return this.post<AuthResponse>('/google', { credential } satisfies GoogleSignInPayload);
  }
}
