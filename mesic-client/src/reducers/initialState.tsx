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
  checkRemoved: "",
  checkAdded: "",
  checkedFollow: [],
  currentMarker: 0,
  markerSet: [
    ["pin1.png", "color1.png"],
    ["pin2.png", "color2.png"],
    ["pin3.png", "color3.png"],
    ["pin4.png", "color4.png"],
    ["pin5.png", "color5.png"],
    ["pin6.png", "color6.png"],
  ],
};
