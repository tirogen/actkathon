export enum UserRole {
  Owner = 'Owner',
  Admin = 'Admin',
  Manager = 'Manager',
  Member = 'Member',
}

export const adminPermission = [UserRole.Admin, UserRole.Manager, UserRole.Member];
export const managerPermission = [UserRole.Manager, UserRole.Member];
