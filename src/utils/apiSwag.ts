import axios from 'axios';

const instance = axios.create({
  baseURL: `https://virtserver.swaggerhub.com/kurnhyalcantara/teman-petani/1.0.0/`,
});

export default {
  // ----- order Product -----

  postOrders: (token?: string, data?: object, productId?: string) =>
    instance({
      method: 'POST',
      url: `products/${productId}/orders`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  postNego: (token?: string, data?: object, productId?: string) =>
    instance({
      method: 'POST',
      url: `products/${productId}/orders`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getSold: (token?: string) =>
    instance({
      method: 'GET',
      url: `users/sold`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getOrders: (token?: string) =>
    instance({
      method: 'GET',
      url: `users/orders`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
