import React from 'react';
import PlaceLocationDetails from './../places/PlaceLocationDetails';

export class ItineraryEventExtraDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={
          this.props.visible
            ? 'card__additional-information'
            : 'card__additional-information--hidden'
        }
      >
        <PlaceLocationDetails
          placeId={this.props.event.places[0]}
          showHours={true}
          showMap={false}
        />
      </div>
    );
  }
}
