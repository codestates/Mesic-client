export const initialState = {
  openConfirm: false,
  user: {
    isLogin: true,
    mode: "READ",
    token: "aoejwo223",
    email: "test@test.com",
    name: "test",
    profileImg:
      "https://pbs.twimg.com/profile_images/1325699371304771586/WRDhh8rG_400x400.jpg",
    nickname: "test user",
    user_id: "60abb5e1473efa33250b3e5f",
  },
  googleToken: "",
  follow: [ 
    // 60ab5e1473efa33250b3, 41241afwa5e1473efa3325, 23awefawef5e1473efa33250, 60abb5e1473efawefwa
  ],
  checkedFollow: [
    // 60ab5e1473efa33250b3, 41241afwa5e1473efa3325
  ]
};
