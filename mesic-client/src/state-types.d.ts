export type keywordSearchData = {
  y: number;
  x: number;
}[];

export type markerData = {
  location: {
    latitude: string;
    longitude: string;
  };
  memo: string;
  music: {
    thumbnail: string;
    title: string;
    video_Id: string;
  };
  photo: string;
  user_id: string;
  _id: string;
  __v?: number;
} | null;

export type musicData = {
  video_Id: string;
  title: string;
  thumbnail: string;
};

export type followerData = {
  email: string;
  follow: string[];
  marker: string;
  name: string;
  nickname: string;
  password: string;
  profile: string;
  refreshToken: string;
  __v?: number;
  _id: string;
};
