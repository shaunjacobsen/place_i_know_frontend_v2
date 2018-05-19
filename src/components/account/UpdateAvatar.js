import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Alert, Upload, Icon, Spin } from 'antd';
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
    if (!isSmallEnough) {
      this.setState(() => ({
        imageUploadError: 'Image must be 3mb or smaller.',
      }));
    }
  };

  async getUploadSignature() {
    const signature = axios.get(`${process.env.REACT_APP_API_URL}/image/sign_upload`, {
      data: {},
      headers: {
        'x-auth': this.props.authToken,
      },
    });
  }

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
