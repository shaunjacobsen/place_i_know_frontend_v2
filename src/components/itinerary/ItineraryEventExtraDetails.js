import React from 'react';
import { Row, Col } from 'antd';
import { ItineraryEventHours } from './ItineraryEventHours';
import { ItineraryEventLocation } from './ItineraryEventLocation';

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
        <Row>
          <Col xs={24} md={14}>
            <h3>Location & Contact</h3>
            <ItineraryEventLocation event={this.props.event} />
          </Col>
          <Col xs={24} md={10}>
            {!!this.props.event.place_hours && (
              <div>
                <h3>Hours</h3>
                <ItineraryEventHours
                  hours={this.props.event.place_hours}
                  eventDate={this.props.event.date}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
