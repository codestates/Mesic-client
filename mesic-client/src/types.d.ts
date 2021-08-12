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
    video_id: string;
  };
  photo: string;
  user_id: string;
  _id: string;
  __v?: number;
} | null;
