export interface AuthenticationRequest {
  usernameOrEmail: string;
  password: string;
  isPersistent: boolean;
}

export interface AuthenticationPayload {
  isAuthenticate: boolean;
  role: string | string[] | undefined;
  email: string | undefined;
  token: string | undefined;
}
