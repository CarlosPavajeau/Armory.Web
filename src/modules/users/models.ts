export interface ArmoryRole {
  name: string;
}

export type ArmoryRoles = ArmoryRole[];

export interface ChangePasswordRequest {
  usernameOrEmail: string;
  oldPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}
