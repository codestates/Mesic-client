export const initialState = {
  openConfirm: false,
  user: {
    isLogin: false,
    mode: "READ",
    token: "",
    email: "",
    name: "",
    profileImg:
      "https://pbs.twimg.com/profile_images/1325699371304771586/WRDhh8rG_400x400.jpg",
    nickname: "",
    user_id: "",
    follow: [],
  },
  googleToken: "",
  follows: [],
  checkedFollow: [],
};
