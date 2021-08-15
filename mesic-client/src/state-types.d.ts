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

export type readMusic = {
  video_Id: string;
  title: string;
  thumbnail: string;
};