export interface AuthUserType {
  id: string;
  email: string;
  displayName: string;
  token: string;
  type_login: number;
  time: Date | null;
}
