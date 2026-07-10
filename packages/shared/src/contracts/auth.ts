export interface TokenPayload {
  userId: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AuthResult {
  id: string;
  name: string;
  email: string;
  avatar: string;
  token: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface GoogleSignInPayload {
  /** The Google ID token (JWT credential) returned by Google Identity Services. */
  credential: string;
}
