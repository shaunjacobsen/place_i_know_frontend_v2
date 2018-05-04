import React from 'react';
import { Icon, Divider } from 'antd';
import { PlaceLocationDetails } from './../places/PlaceLocationDetails';

export const AccommodationExtraInfo = props => {
  const place = {
    place_name: props.info.place.name,
    place_address_1: props.info.place.address1,
    place_address_2: props.info.place.address2,
    place_city: props.info.place.city,
    place_state: props.info.place.state,
    place_postal: props.info.place.postal,
    place_country: props.info.place.country,
    place_website: props.info.place.website,
    place_phone: props.info.place.phone,
  };

  const mapInfo = {
    lat: props.info.place.latitude,
    lng: props.info.place.longitude,
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
          <PlaceLocationDetails place={place} mapInfo={mapInfo} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
