import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Alert, Upload, Icon, Spin, Divider } from 'antd';
import CropImage from './CropImage';
import { updateAvatar } from './../../actions/user';

export class UpdateAvatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUploadingImage: false,
      imageUploadError: undefined,
      isInitialImageUploaded: false,
      initialUploadedImageUrl: undefined,
      initialUploadedImagePublicId: undefined,
      isFinalImageUploading: false,
      isFinalImageUploaded: false,
      finalUploadedImageUrl: undefined,
    };
  }

  customUploadRequest({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
  }) {
    const formData = new FormData();
    if (data) {
      Object.keys(data).map(key => {
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);

    axios
      .post(action, formData, {
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
        },
      })
      .then(({ data: response }) => {
        onSuccess(response, file);
      })
      .catch(onError());
  }

  handleStartUploadingInitial = () => {
    this.setState(() => ({
      isUploadingImage: true,
      imageUploadError: null,
    }));
  };

  handleErrorUploadingInitial = () => {
    console.log('error uploading');
  };

  handleFinishUploadingInitial = data => {
    this.setState(() => ({
      isUploadingImage: false,
      isInitialImageUploaded: true,
      initialUploadedImageUrl: data.url,
      initialUploadedImagePublicId: data.public_id,
    }));
  };

  beforeUpload = file => {
    const isSmallEnough = file.size / 1024 / 1024 <= 3;
    const isCorrectFileType =
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png';
    if (!isSmallEnough) {
      this.setState(() => ({
        imageUploadError: 'Image must be 3 MB or smaller.',
      }));
    }
    if (!isCorrectFileType) {
      this.setState(() => ({
        imageUploadError: 'Please select an image ending in .jpg, .jpeg, or .png',
      }));
    }
    return isSmallEnough && isCorrectFileType;
  };

  uploadCroppedAvatar = async data => {
    try {
      this.setState(() => ({
        isFinalImageUploading: true,
      }));
      const uploadRequest = await axios.post(
        `${process.env.REACT_APP_API_URL}/image/upload_final`,
        {
          type: 'new_avatar',
          image: data,
          delete: this.state.initialUploadedImagePublicId,
        },
        { headers: { 'x-auth': this.props.authToken } }
      );
      if (uploadRequest.status === 201) {
        this.props.updateAvatarUrl(uploadRequest.data.new_image_url);
        this.setState(() => ({
          isFinalImageUploaded: true,
          isFinalImageUploading: false,
          imageUploadError: undefined,
          isUploadingImage: false,
          isInitialImageUploaded: false,
          initialUploadedImagePublicId: undefined,
          initialUploadedImageUrl: undefined,
        }));
      }
    } catch (e) {
      this.handleErrorUploadingFinal();
    }
  };

  handleErrorUploadingFinal = () => {
    this.setState(() => ({
      imageUploadError: 'Error uploading final image.',
      isFinalImageUploaded: false,
      isFinalImageUploading: false,
      isInitialImageUploaded: false,
      isUploadingImage: false,
      initialUploadedImageUrl: undefined,
      initialUploadedImagePublicId: undefined,
    }));
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.isUploadingImage ? (
          <div>
            <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
            <div>Uploading...</div>
          </div>
        ) : (
          <div>
            <Icon type="plus" style={{ fontSize: 24 }} />
            <div>Upload New</div>
          </div>
        )}
      </div>
    );

    if (this.state.isInitialImageUploaded) {
      return (
        <CropImage
          imageUrl={this.state.initialUploadedImageUrl}
          handleSaveAvatar={data => this.uploadCroppedAvatar(data)}
          isFinalImageUploading={this.state.isFinalImageUploading}
        />
      );
    } else {
      return (
        <div>
          {this.state.imageUploadError && (
            <Alert message={this.state.imageUploadError} type="error" showIcon />
          )}
          {this.state.isFinalImageUploaded && (
            <Alert message="New avatar successfully uploaded." type="success" showIcon />
          )}
          <Upload
            name="avatar"
            accept="image/jpg, image/jpeg, image/png, image/gif"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={this.beforeUpload}
            action={`${process.env.REACT_APP_API_URL}/image/upload_initial`}
            customRequest={this.customUploadRequest}
            onProgress={this.handleStartUploadingInitial}
            onSuccess={this.handleFinishUploadingInitial}
            onError={this.handleErrorUploadingInitial}
            headers={{ 'x-auth': this.props.authToken }}
          >
            {uploadButton}
          </Upload>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  updateAvatarUrl: url => dispatch(updateAvatar(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAvatar);
