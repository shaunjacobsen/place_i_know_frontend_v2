import React from 'react';
import { connect } from 'react-redux';
import { selectPlaceById } from './../../selectors/place';
import { Divider, Row, Col } from 'antd';
import { SingleMarkerMap } from './../places/SingleMarkerMap';
import { Hours } from './Hours';

export class PlaceLocationDetails extends React.Component {
  hoursAvailable() {
    return this.props.showHours && Object.keys(this.props.place.hours).length > 0;
  }
  render() {
    return (
      <Row>
        <Col xs={24}>
          {this.props.showMap &&
            this.props.mapInfo && <SingleMarkerMap point={this.props.mapInfo} />}
        </Col>
        <Col xs={24} sm={this.hoursAvailable() ? 14 : 24}>
          <h3>Location & Contact</h3>
          <strong>{this.props.place.name}</strong>
          <br />
          {this.props.place.address1}
          <br />
          {this.props.place.address2}
          {this.props.place.address2 && <br />}
          {this.props.place.city}&nbsp;
          {this.props.place.state}&nbsp;
          {this.props.place.postal}
          <br />
          {this.props.place.country}
          <br />
          {this.props.place.website && (
            <a href={this.props.place.website} target="_blank">
              Website
            </a>
          )}
          {this.props.place.phone &&
            this.props.place.website && <Divider type="vertical" />}
          {this.props.place.phone}
        </Col>
        {this.hoursAvailable() && (
          <Col xs={24} sm={10}>
            <h3>Hours</h3>
            <Hours hours={this.props.place.hours} />
          </Col>
        )}
      </Row>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    place: props.place ? props.place : selectPlaceById(props.placeId, state.activeTrip.places.data),
  };
};

export default connect(mapStateToProps)(PlaceLocationDetails);
