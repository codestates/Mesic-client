export const initialState = {
  openConfirm: false,
  user: {
    isLogin: true,
    mode: "READ",
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
