export interface IRole {
  _id: string;
  role: string;
  description?: string;
  active: boolean;
}

export interface User {
  googleId: string,
  email: string,
  name: string,
  photoUrl: string,
  roles: IRole[];
}
