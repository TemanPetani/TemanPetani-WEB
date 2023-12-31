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

export interface GetTasks extends GetTemplates {
  activity?: GetTaskDetail[];
}

export interface GetTaskDetail {
  name?: string;
  id?: number;
  startDays?: number;
}

export interface Getplants {
  farmerName?: string;
  scheduleName?: string;
  id?: number;
}

export interface GetPlantsDetail {
  id?: number;
  name?: string;
  startDate?: string;
  activities?: GetPlantsActivity[];
}

export interface GetPlantsActivity {
  name?: string;
  id?: number;
  startDate?: string;
  completedDate?: string;
}
