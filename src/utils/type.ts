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
  id?: number;
  bank?: string;
  accountNumber?: string;
}

export interface getAllProduct {
  id?: string;
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
  imageUrl?: string;
  owner?: UserProduct;
}

export interface UserProduct {
  id?: string;
  fullname?: string;
  email?: string;
  role?: string;
}

export interface GetTemplates {
  name?: string;
  id?: number;
}
