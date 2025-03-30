export interface AuthState {
  email?: string[] | undefined;
  password?: string[] | undefined;
}

export interface User {
  id: string | number;
  fullName: string;
  email: string;
  avatar: string;
  role: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
