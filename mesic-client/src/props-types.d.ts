import { markerData } from "./state-types";
import { musicData } from "./state-types";

export type MemoProps = {
  readMemo: string;
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export type NoMemoProps = {
  addMemoInput: React.RefObject<HTMLTextAreaElement>;
  handleAddMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  savebtn?: boolean;
  setSavebtn?: React.Dispatch<React.SetStateAction<boolean>>;
  addReadMemo?: () => void;
  setAddedMemo?: React.Dispatch<React.SetStateAction<string>>;
};

export type UpdateMemoProps = {
  handleUpdateMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readMemo: string;
  updateReadMemo: () => void;
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatedMemo: React.Dispatch<React.SetStateAction<string>>;
};

export type PostMemoProps = {
  setPostMemo: React.Dispatch<React.SetStateAction<string>>;
};

export type ReadMemoProps = {
  readMemo: string;
  setReadMemo: React.Dispatch<React.SetStateAction<string>>;
  markerId: string;
  setPinUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ReadModalProps = {
  readMarkerData: markerData;
  setPinUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMyMarker: (pinId: string) => void;
  setOpenReadModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PostModalProps = {
  postLatLng: number[];
  setOpenPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  deletePostMarkers: () => void;
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
