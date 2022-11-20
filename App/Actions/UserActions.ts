import { GET_USER, LOG_OUT,SET_USER } from '@Keys/index';

export const getUserDetail = () => ({
  type: GET_USER,
});

export const userLogout = () => ({
  type: LOG_OUT,
});

export const setUser = (payload:any) => ({
  type: SET_USER,
  payload
});
