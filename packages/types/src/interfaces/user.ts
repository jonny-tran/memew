import { UserRole } from "../enums";

export interface User {
  UserID: string;
  Role: UserRole;
  Email: string;
  Username: string;
  Password?: string;
  AvatarURL: string | null;
}
