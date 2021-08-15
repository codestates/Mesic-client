import { markerData } from "./state-types";
import { musicData } from "./state-types";
import { followerData } from "./state-types";

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
  postMusic: musicData;
  setPostMusic: React.Dispatch<React.SetStateAction<musicData>>;
};

export type ReadMusicProps = {
  readMusic: musicData;
  setReadMusic: React.Dispatch<React.SetStateAction<musicData>>;
  markerId: string;
  setPinUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditMusicProps = {
  openEditMusic: boolean;
  setOpenEditMusic: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  setPostUpdateMusic: React.Dispatch<React.SetStateAction<musicData>>;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MusicProps = {
  setOpenEditMusic: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  musicData: musicData;
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
};

export type NoMusicProps = {
  setOpenEditMusic: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UpdateMusicProps = {
  updateMusic: musicData;
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateMusic: React.Dispatch<React.SetStateAction<musicData>>;
  updateReadMusic: () => void;
};

export type NoPhotoProps = {
  imageInput: React.RefObject<HTMLInputElement>;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type PhotoProps = {
  imageInput: React.RefObject<HTMLInputElement>;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  readImg: string;
};

export type UpdatePhotoProps = {
  editedPreviewImg: string;
  updateReadImg: () => void;
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedImg: React.Dispatch<any>;
};

export type ReadPhotoProps = {
  readImg: string;
  setReadImg: React.Dispatch<React.SetStateAction<string>>;
  markerId: string;
  setPinUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PostPhotoProps = {
  postImg: any;
  setPostImg: React.Dispatch<any>;
};

export type ConfirmModalProps = {
  confirmType: string;
  openConfirm: boolean;
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setPostImg?: React.Dispatch<any>;
  readImg?: string;
  setReadImg?: React.Dispatch<React.SetStateAction<string>>;
  setPostMusic?: React.Dispatch<React.SetStateAction<musicData>>;
  setUpdateMode?: React.Dispatch<React.SetStateAction<boolean>>;
  imageInput?: React.RefObject<HTMLInputElement>;
  deleteReadMusic?: () => void;
  markerId?: string;
  setPinUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMyMarker?: (pinId: string) => void;
  readMarkerData?: markerData;
};

export type FollowListProps = {
  setLoginController: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EachFollowProps = {
  eachFollow: followerData;
  updateFollow: () => void;
};

export type SearchUserProps = {
  openSearchUser: boolean;
  setOpenSearchUser: React.Dispatch<React.SetStateAction<boolean>>;
  followList: followerData[];
  updateFollow: () => void;
  setLoginController: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MypageProps = {
  openMypage: boolean;
  closeMypage: () => void;
  setOpenEditMypage: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditMypageProps = {
  setOpenMypage: React.Dispatch<React.SetStateAction<boolean>>;
  openEditMypage: boolean;
  setOpenEditMypage: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SignUpProps = {
  openSignup: boolean;
  setOpenSignup: React.Dispatch<React.SetStateAction<boolean>>;
  getUserInfo: (user_id: string) => void;
};
