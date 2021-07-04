export interface AuthenticationRequest {
  usernameOrEmail: string;
  password: string;
  isPersistent: boolean;
}

export interface ArmoryRole {
  name: string;
}

export type ArmoryRoles = ArmoryRole[];
