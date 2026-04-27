export interface IRoles {
  role: string;
  description: string;
  active: boolean;
}

export interface IUser {
  userId: string;
  email: string;
  name: string;
  photoUrl: string;
  roles: IRoles[];
}

export interface IRegisterUser {
  email: string;
  name: string;
  password: string;
}