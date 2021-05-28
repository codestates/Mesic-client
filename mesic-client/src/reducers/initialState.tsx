export const initialState = {
  openConfirm: false,
  user: {
    isLogin: false,
    mode: "READ",
    token: "",
    email: "",
    name: "",
    profileImg:
      "https://pbs.twimg.com/media/EhIO_LyVoAA2szZ?format=jpg&name=small",
    nickname: "",
    user_id: "",
    follow: [],
  },
  googleToken: "",
  follows: [],
  checkedFollow: [],
};
