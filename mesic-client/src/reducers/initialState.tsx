import {idText} from "typescript";

export const initialState = {
  show: "off",
  user: {
    isLogin: false,
    token: "",
    email: "",
    name: "",
    profileImage: "",
    nickname: "guest",
  },
  googleToken: "",
  pins: [
    // {
    //   id : "",
    //   x : 13,
    //   y : 125,
    //   music : {
    //     title : "",
    //     artist : "",
    //     albumcover : ""
    //   },
    //   photo : "",
    //   memo : ""
    // }
  ],
  follow: [
    {
      id: "",
      nickname: "",
      pin: [
        // {
        //   id: "",
        //   x: 13,
        //   y: 125,
        //   music: {
        //     title: "",
        //     artist: "",
        //     albumcover: "",
        //   },
        //   photo: "",
        //   memo: "",
        // },
      ],
    },
  ],
};
