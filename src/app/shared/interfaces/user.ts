export interface User {
  userId: string,
  email: string,
  name: string,
  photoUrl: string,
  roles: [string];
}

export interface RegisterUser {
  email: string;
  name: string;
  password: string;
}