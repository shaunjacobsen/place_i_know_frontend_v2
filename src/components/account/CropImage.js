import React from 'react';
import Cropper from 'react-cropper';
import { Button } from 'antd';
import 'cropperjs/dist/cropper.css';

export class CropImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      croppedImageData: undefined,
    };
  }
  cropData = () => {
    this.setState(() => ({
      croppedImageData: this.refs.cropper.getCroppedCanvas().toDataURL(),
    }));
  };

  handleSaveAvatar = () => {
    this.props.handleSaveAvatar(this.state.croppedImageData);
  };

  render() {
    return (
      <div>
        <Cropper
          className="account__avatar-cropper"
          ref="cropper"
          src={this.props.imageUrl}
          aspectRatio={1}
          guides={true}
          crop={this.cropData}
        />
        <div className="account__avatar-save">
          <Button
            onClick={this.handleSaveAvatar}
            size="large"
            type="primary"
            icon="picture"
            loading={this.props.isFinalImageUploading}
          >
            Save Avatar
          </Button>
        </div>
      </div>
    );
  }
}

export default CropImage;
