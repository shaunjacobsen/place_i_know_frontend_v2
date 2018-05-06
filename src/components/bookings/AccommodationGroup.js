import React from 'react';
import { Row, Col, Icon } from 'antd';
import moment from 'moment';
import Accommodation from './Accommodation';
import {DateRange} from './../DateRange';
import { showAccommodationsForGroupBasedOnConfirmationStatus } from './../../filters/accommodation';

export class AccommodationGroup extends React.Component {
  renderTitle() {
    if (this.props.group.status === 'confirmed') {
      return (
        <span>
          <Icon type="check-circle-o" style={{ color: '#85e1c8' }} />&nbsp;
          {this.props.group.title}
        </span>
      );
    } else {
      return <span>{this.props.group.title} Options&nbsp;<small> for <DateRange start={this.props.group.start_date} end={this.props.group.end_date} /></small></span>;
    }
  }

  render() {
    return (
      <div>
        <h3 className="accommodation-list__title">{this.renderTitle()}</h3>
        <Row gutter={6}>
          {showAccommodationsForGroupBasedOnConfirmationStatus(this.props.group).map(
            accommodation => {
              return (
                <Col key={accommodation.accommodation_id} xs={24} sm={12} md={this.props.group.status === 'confirmed' ? 12 : 8 }>
                  <Accommodation
                    key={accommodation.accommodation_id}
                    info={accommodation}
                  />
                </Col>
              );
            }
          )}
        </Row>
      </div>
    );
  }
}
