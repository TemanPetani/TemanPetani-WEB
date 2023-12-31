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
  putUserPicture: (token?: string, data?: FormData) =>
    instance({
      method: 'PUT',
      url: `users/picture`,
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

  putProductText: (token?: string, code?: FormData, productId?: string) =>
    instance({
      method: 'PUT',
      url: `products/${productId}`,
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

  getUsersProducts: (token?: string) =>
    instance({
      method: 'GET',
      url: `users/products`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getMyProduct: (token?: string, role?: string) =>
    instance({
      method: 'GET',
      url: `products/?owner=${role}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getProductId: (token?: string, id?: string) =>
    instance({
      method: 'GET',
      url: `products/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  delProductId: (token?: string, id?: string) =>
    instance({
      method: 'DELETE',
      url: `products/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // ----- Template -----

  getAllTemplates: (token?: string) =>
    instance({
      method: 'GET',
      url: `templates/`,
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

  delTemplates: (token?: string, id?: string) =>
    instance({
      method: 'DELETE',
      url: `templates/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // ----- tasks -----

  getTemplatesById: (token?: string, id?: string) =>
    instance({
      method: 'GET',
      url: `templates/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  postTasks: (token?: string, id?: string, data?: object) =>
    instance({
      method: 'POST',
      url: `templates/${id}/tasks`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  putTasks: (token?: string, id?: string, data?: object) =>
    instance({
      method: 'PUT',
      url: `templates/tasks/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  delTasks: (token?: string, id?: string) =>
    instance({
      method: 'DELETE',
      url: `templates/tasks/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // ----- plant -----

  postPlant: (token?: string, data?: object) =>
    instance({
      method: 'POST',
      url: `plants`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getPlant: (token?: string) =>
    instance({
      method: 'GET',
      url: `plants`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getUserPlant: (token?: string) =>
    instance({
      method: 'GET',
      url: `users/plants`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getPlantId: (token?: string, plantId?: string) =>
    instance({
      method: 'GET',
      url: `plants/${plantId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getPlantNotify: (token?: string) =>
    instance({
      method: 'GET',
      url: `plants/notifications`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  putPlant: (token?: string, activId?: string, data?: object) =>
    instance({
      method: 'PUT',
      url: `plants/activities/${activId}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  delPlant: (token?: string, activId?: string) =>
    instance({
      method: 'DELETE',
      url: `plants/${activId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
