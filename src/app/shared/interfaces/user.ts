export interface IRole {
  _id: string;
  role: string;
  description?: string;
  active: boolean;
}

export interface User {
  id: string,
  email: string,
  name: string,
  picture: string,
  roles: IRole[];
}
