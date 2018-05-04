import React from 'react';
import { Divider } from 'antd';
import { SingleMarkerMap } from './../places/SingleMarkerMap';

export class PlaceLocationDetails extends React.Component {
  render() {
    return (
      <div>
        {this.props.mapInfo && <SingleMarkerMap point={this.props.mapInfo} />}
        <strong>{this.props.place.place_name}</strong>
        <br />
        {this.props.place.place_address_1}
        <br />
        {this.props.place.place_address_2}
        {this.props.place.place_address_2 && <br />}
        {this.props.place.place_city}&nbsp;
        {this.props.place.place_state}&nbsp;
        {this.props.place.place_postal}
        <br />
        {this.props.place.place_country}
        <br />
        {this.props.place.place_website && (
          <a href={this.props.place.place_website} target="_blank">
            Website
          </a>
        )}
        {this.props.place.place_phone &&
          this.props.place.place_website && <Divider type="vertical" />}
        {this.props.place.place_phone}
      </div>
    );
  }
}
