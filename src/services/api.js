import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jw-kisokos-aa53f6432494.herokuapp.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllCards = () => api.get('/api/cards', {withCredentials: true});
export const createCard = (data) =>
  api.post('/api/cards', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteCard = (id) => api.delete(`/api/cards/${id}`);

export default api;
