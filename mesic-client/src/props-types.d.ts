import { markerData } from "./state-types";

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
