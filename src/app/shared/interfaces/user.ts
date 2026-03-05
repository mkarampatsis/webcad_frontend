export interface IRole {
  _id: string;
  role: string;
  description?: string;
  active: boolean;
}

export interface User {
  username: string;
  email: string;
  roles: IRole[];
}
