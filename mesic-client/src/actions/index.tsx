export const SWITCH_MODE = "SWITCH_MODE" as const;
export const EDIT_USERINFO = "EDIT_USERINFO" as const;
export const GET_ACCESSTOKEN = "GET_ACCESSTOKEN" as const;
export const REFRESH_FOLLOW = "REFRESH_FOLLOW" as const;
export const CLEAR_USER_INFO = "CLEAR_USERINFO" as const;
export const ADD_CHECKED_FOLLOW = "ADD_CHECKED_FOLLOW" as const;
export const DELETE_CHECKED_FOLLOW = "DELETE_CHECKED_FOLLOW" as const;
export const CLEAR_CHECKED_REMOVE = "CLEAR_CHECKED_REMOVE" as const;
export const ITERATE_MARKERS = "ITERATE_MARKERS" as const;
export const CLEAR_MODE_STATE = "CLEAR_MODE_STATE" as const;

export type Action =
  | ReturnType<typeof switchMode>
  | ReturnType<typeof editUserinfo>
  | ReturnType<typeof getAccessToken>
  | ReturnType<typeof refreshFollow>
  | ReturnType<typeof addCheckedFollow>
  | ReturnType<typeof deleteCheckedFollow>
  | ReturnType<typeof clearCheckedRemove>
  | ReturnType<typeof iterateMarkers>
  | ReturnType<typeof clearModeState>
  | ReturnType<typeof clearUserInfo>;

export const switchMode = (
  data: "READ" | "POST" | "CREATED" | "WATCH" | "NONE"
): any => {
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
  profileImg: string,
  follow: string[]
): any => {
  return {
    type: EDIT_USERINFO,
    payload: {
      id,
      email,
      name,
      nickname,
      profileImg,
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
  };
};

export const clearUserInfo = () => {
  return {
    type: CLEAR_USER_INFO,
  };
};

export const clearModeState = () => {
  return {
    type: CLEAR_MODE_STATE,
  };
};

export const addCheckedFollow = (user_id: string): any => {
  return {
    type: ADD_CHECKED_FOLLOW,
    payload: {
      user_id,
    },
  };
};

export const deleteCheckedFollow = (user_id: string): any => {
  return {
    type: DELETE_CHECKED_FOLLOW,
    payload: {
      user_id,
    },
  };
};

export const iterateMarkers = (): any => {
  return {
    type: ITERATE_MARKERS,
  };
};

export const clearCheckedRemove = (): any => {
  return {
    type: CLEAR_CHECKED_REMOVE,
  };
};
