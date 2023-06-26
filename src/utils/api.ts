import axios from 'axios';
import { PostLogin, PostRegis } from './type';

const instance = axios.create({
  baseURL: `https://temanpetani-api-7hxmz4cxza-as.a.run.app/`,
});

export default {
  // ----- login logogut -----

  postLogin: (code?: PostLogin) =>
    instance({
      method: 'POST',
      url: `login`,
      data: code,
    }),

  // ----- users -----

  postRegister: (code?: PostRegis) =>
    instance({
      method: 'POST',
      url: `users`,
      data: code,
    }),
  getUserById: (token?: string) =>
    instance({
      method: 'GET',
      url: `users/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  putUserById: (token?: string, data?: any) =>
    instance({
      method: 'PUT',
      url: `users/profile`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  delUserById: (token?: string) =>
    instance({
      method: 'DELETE',
      url: `users/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  putUserRoleById: (token?: string, data?: any) =>
    instance({
      method: 'PUT',
      url: `users/role`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
