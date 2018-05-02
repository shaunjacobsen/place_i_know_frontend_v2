import React from 'react';
import { Divider } from 'antd';

export class ItineraryEventLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <strong>{this.props.event.place_name}</strong>
        <br />
        {this.props.event.place_address_1}
        <br />
        {this.props.event.place_address_2}
        {this.props.event.place_address_2 && <br />}
        {this.props.event.place_city}&nbsp;
        {this.props.event.place_state}&nbsp;
        {this.props.event.place_postal}
        <br />
        {this.props.event.place_country}
        <br />
        {this.props.event.place_website && (
          <a href={this.props.event.place_website} target="_blank">
            Website
          </a>
        )}
        {this.props.event.place_phone &&
          this.props.event.place_website && <Divider type="vertical" />}
        {this.props.event.place_phone}
      </div>
    );
  }
}
