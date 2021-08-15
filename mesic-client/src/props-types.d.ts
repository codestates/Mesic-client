import { readMusic } from "./state-types";

export type MemoProps = {
  readMemo: string;
  setUpdateMode: (value: boolean) => void;
};

export type PostMusicProps = {
  postMusic: readMusic;
  setPostMusic: React.Dispatch<React.SetStateAction<readMusic>>;
};

export type ReadMusicProps = {
  readMusic: readMusic;
  setReadMusic: React.Dispatch<React.SetStateAction<readMusic>>;
  markerId: string;
  setPinUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditMusicProps = {
  openEditMusic: boolean;
  setOpenEditMusic: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  setPostUpdateMusic: React.Dispatch<React.SetStateAction<readMusic>>;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MusicProps = {
  setOpenEditMusic: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  musicData: readMusic;
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
};

export type NoMusicProps = {
  setOpenEditMusic: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UpdateMusicProps = {
  updateMusic: readMusic;
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateMusic: React.Dispatch<React.SetStateAction<readMusic>>;
  updateReadMusic: () => void;
};
