export interface AuthUserType {
  id: string;
  email: string;
  oauth_id: string;
  display_name: string;
  token: string;
  type_login: number;
  time: Date | null;
}
