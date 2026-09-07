export interface Login {
  token: string;
  user: User;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
}
