import { Dispatch } from "redux";

export const SWITCH_MODE = "SWITCH_MODE" as const;

export type Action = ReturnType<typeof switchMode>;

export const switchMode = (data: "READ" | "POST" | "NONE"): any => {
  return {
    type: SWITCH_MODE,
    payload: {
      data,
    },
  };
};

// export const editUserInfo= ()
