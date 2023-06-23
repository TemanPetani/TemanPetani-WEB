export interface PostLogin {
  email?: string;
  password?: string;
}

export interface PostRegis extends PostLogin {
  phone?: string;
  fullname?: string;
  address?: string;
}

export interface getUsers extends PostRegis {
  avatar?: string;
  role?: string;
}
