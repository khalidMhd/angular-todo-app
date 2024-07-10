export interface UserCredentials {
  email: string;
  password: string;
}

export interface User extends UserCredentials {
  name: string;
}

export interface UserList {
  name: string;
  email: string;
}
