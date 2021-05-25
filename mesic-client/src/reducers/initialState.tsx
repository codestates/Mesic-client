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
  },
  googleToken: "",
  pins: [
    {
      _id: 1,
      location: {
        longitude: 37.5139795454969,
        latitude: 127.048963363388,
      },
      music: {
        video_Id: "Uz0PppyT7Cc",
        title: "BTS (방탄소년단) - Butter (Official Audio)",
        thumbnail: "https://i.ytimg.com/vi/Uz0PppyT7Cc/mqdefault.jpg",
      },
      photo:
        "https://www.tripsavvy.com/thmb/J8K1vZSr_wwvWxARsYXPMtP295Q=/2000x3008/filters:fill(auto,1)/Eiffel-Tower-4c710a32fca4406c81f49815312339c7.jpg",
      memo: "뻐터뻐터~~",
      user_id: 1,
    },
    {
      _id: 2,
      location: {
        longitude: 37.51042505155147,
        latitude: 127.0420299463025,
      },
      music: {
        video_Id: "7C2z4GqqS5E",
        title: "BTS (방탄소년단) - FAKE LOVE",
        thumbnail: "https://i.ytimg.com/vi/Uz0PppyT7Cc/mqdefault.jpg",
      },
      photo:
        "https://www.expatica.com/app/uploads/sites/10/2014/05/best-place-to-live-in-uk.jpg",
      memo: "페이크 러브~",
      user_id: 1,
    },
    {
      _id: 3,
      location: {
        longitude: 37.51669558042181,
        latitude: 127.0433003486247,
      },
      music: {
        video_Id: "OiMWFojB9Ok",
        title: "BTS (방탄소년단) - Butter (Official Audio)",
        thumbnail: "https://i.ytimg.com/vi/Uz0PppyT7Cc/mqdefault.jpg",
      },
      photo: "https://i.insider.com/5acd01546898757c378b4e02?width=700",
      memo: "다이너마이트~~~",
      user_id: 1,
    },
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
