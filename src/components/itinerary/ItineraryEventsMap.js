import React from 'react';
import { connect } from 'react-redux';
import { mapLoadBounds } from './../../actions/map';
import { Map } from './Map';

export class ItineraryEventsMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="itinerary-map__container">
        <div className="itinerary-map__container--sticky">
          <Map points={this.props.mapData.points} bounds={this.props.mapData.bounds} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBounds: points => dispatch(mapLoadBounds(points)),
  };
};

const mapStateToProps = state => {
  return {
    mapData: state.map,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryEventsMap);
