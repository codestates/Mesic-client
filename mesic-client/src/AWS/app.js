const AWS  = require('aws-sdk');
const S3 = new AWS.S3;

const bucket = 'mesic-photo-bucket';
const bucketRegion = 'ap-northeast-2';
const IdentityPoolId = 'ap-northeast-2:2c7d94b9-746d-4871-abdd-69aa237048ca';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});


class AwsS3 {
  async upload(file) {
    const params = {};
    params.Key = `image/${file}`;
    params.Bucket = bucket;
    params.Body = file;
    params.contentType = 'image/jpg';
 
    S3.upload(params, function (err, data) {
      if(err) {
        console.log(err) 
        return; 
      }
      console.log(data.location)
      return data.location
    });
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
// this.AwsS3.upload('http://ticketimage.interpark.com/Play/image/large/18/18009670_p.gif')

// AWS.config.region = 'ap-northeast-2'; // 리전
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'ap-northeast-2:2c7d94b9-746d-4871-abdd-69aa237048ca',
// });