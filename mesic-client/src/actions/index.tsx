import {Dispatch} from "redux";

export const ON_OFF = "ON_OFF" as const;

export type Action = 
    | ReturnType<typeof onOff>

export const onOff = (data: string) => {
  return {
    type: ON_OFF,
    payload: {
      data,
    },
  };
};
