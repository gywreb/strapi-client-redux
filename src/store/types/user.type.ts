export interface IRegisterUser {
  username: string;
  email: string;
  gender: string;
  password: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IUserInfo {
  _id: string;
  username: string;
  email: string;
  gender: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  photoUrl?: string | null;
}
