export const initialState = {
  openConfirm: false,
  user: {
    isLogin: true,
    mode: "READ",
    token: "aoejwo223",
    email: "test@test.com",
    name: "test",
    profileImage:
      "https://pbs.twimg.com/profile_images/1325699371304771586/WRDhh8rG_400x400.jpg",
    nickname: "test user",
  },
  googleToken: "",
  pins: [
    {
      id: 1,
      y: 37.5139795454969,
      x: 127.048963363388,
      music: "https://soundcloud.com/bangtan/thankyouarmy2020",
      photo:
        "https://www.tripsavvy.com/thmb/J8K1vZSr_wwvWxARsYXPMtP295Q=/2000x3008/filters:fill(auto,1)/Eiffel-Tower-4c710a32fca4406c81f49815312339c7.jpg",
      memo: "국내인데 에펠탑 사진은 뭐지1",
    },
    {
      id: 2,
      y: 37.51042505155147,
      x: 127.0420299463025,
      music: "https://soundcloud.com/bangtan/thankyouarmy2020",
      photo:
        "https://www.tripsavvy.com/thmb/J8K1vZSr_wwvWxARsYXPMtP295Q=/2000x3008/filters:fill(auto,1)/Eiffel-Tower-4c710a32fca4406c81f49815312339c7.jpg",
      memo: "국내인데 에펠탑 사진은 뭐지2",
    },
    {
      id: 3,
      y: 37.51669558042181,
      x: 127.0433003486247,
      music: "https://soundcloud.com/bangtan/thankyouarmy2020",
      photo:
        "https://www.tripsavvy.com/thmb/J8K1vZSr_wwvWxARsYXPMtP295Q=/2000x3008/filters:fill(auto,1)/Eiffel-Tower-4c710a32fca4406c81f49815312339c7.jpg",
      memo: "국내인데 에펠탑 사진은 뭐지3",
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
