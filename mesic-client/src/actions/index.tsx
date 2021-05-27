import { Dispatch } from "redux";

export const SWITCH_MODE = "SWITCH_MODE" as const;
export const EDIT_USERINFO = "EDIT_USERINFO" as const;
export const GET_ACCESSTOKEN = "GET_ACCESSTOKEN" as const;
export const REFRESH_FOLLOW = "REFRESH_FOLLOW" as const;
export const LOGOUT = "LOGOUT" as const;


export type Action =
  | ReturnType<typeof switchMode>
  | ReturnType<typeof editUserinfo>
  | ReturnType<typeof getAccessToken>
  | ReturnType<typeof refreshFollow>
  | ReturnType<typeof logout>;


export const switchMode = (data: "READ" | "POST" | "CREATED" | "NONE"): any => {
  return {
    type: SWITCH_MODE,
    payload: {
      data,
    },
  };
};

export const editUserinfo = (
  id: string,
  email: string,
  name: string,
  nickname: string,
  follow: string[]
): any => {
  return {
    type: EDIT_USERINFO,
    payload: {
      id,
      email,
      name,
      nickname,
      follow,
    },
  };
};

export const getAccessToken = (token: string): any => {
  return {
    type: GET_ACCESSTOKEN,
    payload: {
      token,
    },
  };
};

export const refreshFollow = (follow: string[]): any => {
  return {
    type: REFRESH_FOLLOW,
    payload: {
      follow,
    },
  },
  
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
