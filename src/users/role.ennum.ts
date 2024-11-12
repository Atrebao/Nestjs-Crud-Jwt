export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export function convertToUserRole(str: string): UserRole | undefined {
  const role = UserRole[str as keyof typeof UserRole];

  if (role !== undefined) {
    return role;
  } else {
    return UserRole.USER;
  }
}
