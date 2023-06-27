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

  // ----- products -----

  postProduct: (token?: string, code?: FormData) =>
    instance({
      method: 'POST',
      url: `products`,
      data: code,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  putProductImage: (token?: string, code?: FormData, productId?: string) =>
    instance({
      method: 'PUT',
      url: `products/${productId}/images`,
      data: code,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getProductAll: (token?: string, role?: string) =>
    instance({
      method: 'GET',
      url: `products/?role=${role}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // ----- Template Tasks -----

  getAllTemplates: (token?: string) =>
    instance({
      method: 'GET',
      url: `templates/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getTemplatesById: (token?: string, code?: string) =>
    instance({
      method: 'GET',
      url: `templates/${code}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  postTemplates: (token?: string, code?: object) =>
    instance({
      method: 'POST',
      url: `templates`,
      data: code,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  putTemplates: (token?: string, id?: string, data?: object) =>
    instance({
      method: 'PUT',
      url: `templates/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
