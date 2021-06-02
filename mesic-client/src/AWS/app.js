const AWS  = require('aws-sdk');
const S3 = new AWS.S3;

const bucket = 'mesic-photo-bucket';
const bucketRegion = 'ap-northeast-2';
const IdentityPoolId = 'ap-northeast-2:2c7d94b9-746d-4871-abdd-69aa237048ca';

AWS.config.update({ // AWS-SDK 설정을 해주는 데 => 내꺼의 S3로 접근이 가능함.
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});


class AwsS3 {
  async upload(file) {
    const params = {};
    params.Key = `image/${file.name}`;
    params.Bucket = bucket;
    params.Body = file;
    params.contentType = 'image/jpg';
 
    S3.upload(params, function (err, data) {
      if(err) {
        console.log(err) 
        return; 
      }
      console.log(data.Location)
      return data.location
    });
  }

  async get(file) {

    const params = {};
    params.Key = `image/${file}`;
    params.Bucket = bucket;

    S3.getObject(params, function (err, data) {
      if(err) {
        console.log(err)
        return;
      }
      console.log(data.location);
    })
  }

  async delete(file) {

    const params = {};
    params.Key = `image/${file}`;
    params.Bucket = bucket;

    S3.deleteObject(params, function (err, data) {
      if(err) {
        console.log(err)
        return;
      }
      console.log(data);
    })
  }


}

module.exports = new AwsS3();
