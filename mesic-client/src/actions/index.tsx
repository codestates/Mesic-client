import { Dispatch } from "redux";

export const SWITCH_MODE = "SWITCH_MODE" as const;

export type Action = ReturnType<typeof switchMode>;

export const switchMode = (data: "READ" | "POST" | "UPDATE"): any => {
  return {
    type: SWITCH_MODE,
    payload: {
      data,
    },
  };
};
