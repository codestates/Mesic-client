export type keywordSearchData = {
  y: number;
  x: number;
}[];

export type readMarkerData = {
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
} | null;
