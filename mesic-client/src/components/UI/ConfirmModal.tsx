import axios from "axios";
import AWS from "aws-sdk";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { ConfirmModalProps } from "../../props-types";

function ConfirmModal({
  confirmType,
  openConfirm,
  setOpenConfirm,
  setPostImg,
  readImg,
  setReadImg,
  setPostMusic,
  setUpdateMode,
  imageInput,
  deleteReadMusic,
  markerId,
  setPinUpdate,
  deleteMyMarker,
  readMarkerData,
}: ConfirmModalProps) {
  const { token } = useSelector((state: RootState) => state.userReducer.user);

  const deleteReadImg = () => {
    //s3에서 삭제 후 받은 응답을 서버로 patch, get 요청
    const bucket = `${process.env.REACT_APP_AWS_S3_BUCKET}`;
    AWS.config.region = process.env.REACT_APP_AWS_S3_REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: `${process.env.REACT_APP_AWS_S3_REGION}:${process.env.REACT_APP_AWS_S3_IDENTITY_POOL_ID}`,
    });

    const s3 = new AWS.S3();
    const file = readImg!.split("/");
    const fileName = file[file.length - 1];
    const param = {
      Bucket: bucket,
      Key: `image/${fileName}`,
    }; //s3 업로드에 필요한 옵션 설정

    s3.deleteObject(param, function (err: Error) {
      if (err) {
        console.log(err);
        return;
      }

      const location = `https://${process.env.REACT_APP_AWS_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com/image/undefined`;
      const updateData = {
        photo: location,
      };

      axios
        .patch(
          `${process.env.REACT_APP_SERVER_URL}/photos/${markerId}`,
          updateData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          getUpdatedPin();
        })
        .catch((err) => console.log(err));
    });
  };

  const getUpdatedPin = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/pins/pins/${markerId}`)
      .then((res) => {
        if (setReadImg && setPinUpdate) {
          setReadImg(res.data.photo);
          setPinUpdate(true);
          setOpenConfirm(false);
        }
      });
  };

  const deletePostImg = () => {
    const location = `https://${process.env.REACT_APP_AWS_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com/image/undefined`;
    if (setPostImg && imageInput?.current) {
      setPostImg(location);
      imageInput.current.value = "";
      setOpenConfirm(false);
    }
  };

  const deletePostMusic = () => {
    if (setPostMusic && setUpdateMode) {
      setPostMusic({
        video_Id: "",
        title: "",
        thumbnail: "",
      });
      setUpdateMode(false);
      setOpenConfirm(false);
    }
  };

  return (
    <div className={`confirm-modal background ${openConfirm ? "show" : ""}`}>
      <div className="confirm-modal-outsider" />
      <div className="confirm-modal-content">
        <div>삭제하시겠습니까?</div>
        <div>
          <div>
            {confirmType === "postPhoto" ? (
              <button onClick={deletePostImg}>예</button>
            ) : confirmType === "readPhoto" ? (
              <button onClick={deleteReadImg}>예</button>
            ) : confirmType === "postMusic" ? (
              <button onClick={deletePostMusic}>예</button>
            ) : confirmType === "readMusic" ? (
              <button onClick={() => deleteReadMusic && deleteReadMusic()}>
                예
              </button>
            ) : (
              confirmType === "readModal" && (
                <button
                  onClick={async () => {
                    if (deleteMyMarker && readMarkerData) {
                      let result = await deleteMyMarker(readMarkerData._id);
                      if (result!) {
                        setOpenConfirm(false);
                      }
                    }
                  }}
                >
                  예
                </button>
              )
            )}
          </div>
          <div>
            <button onClick={() => setOpenConfirm(false)}>아니오</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
