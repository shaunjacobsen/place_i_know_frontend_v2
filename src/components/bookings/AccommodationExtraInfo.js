import React from 'react';
import { Icon, Divider } from 'antd';
import { PlaceLocationDetails } from './../places/PlaceLocationDetails';

export const AccommodationExtraInfo = props => {
  const mapInfo = {
    lat: props.place.latitude,
    lng: props.place.longitude,
  };

  return (
    <div
      className={
        props.visible
          ? 'card__additional-information'
          : 'card__additional-information--hidden'
      }
    >
      {props.visible ? (
        <div>
          {props.info.notes || props.info.breakfast_included ? (
            <div>
              <h3>Notes</h3>
              <strong>
                {props.info.breakfast_included ? 'Breakfast included!' + <br /> : ''}
              </strong>
              {props.info.notes}
              <Divider />
            </div>
          ) : (
            ''
          )}
          <h3>Location & Contact</h3>
          <PlaceLocationDetails
            place={this.props.place}
            showHours={false}
            showMap={true}
            mapInfo={mapInfo}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
