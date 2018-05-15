import React from 'react';
import { connect } from 'react-redux';
import { mapLoadBounds } from './../../actions/map';
import { Map } from './Map';
import { getPlaceCoordinatesForEvents } from '../../selectors/map';

export class ItineraryEventsMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="itinerary-map__container">
        <div className="itinerary-map__container--sticky">
          <Map points={this.props.mapPoints} />
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

const mapStateToProps = (state, ownProps) => {
  return {
    mapPoints: getPlaceCoordinatesForEvents(
      ownProps.events,
      state.activeTrip.events.data,
      state.activeTrip.places.data
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryEventsMap);
