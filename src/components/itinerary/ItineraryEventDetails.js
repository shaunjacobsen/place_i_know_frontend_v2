import React from 'react';
import { Icon } from 'antd';
import { ItineraryEventExtraDetails } from './ItineraryEventExtraDetails';

export class ItineraryEventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreDetails: false,
    };
  }

  handleShowMoreOrLessDetailsClick = () => {
    this.setState(prevState => {
      return {
        showMoreDetails: !prevState.showMoreDetails,
      };
    });
  };

  renderDetailsLink = () => {
    return (
      <button
        className="button button--link"
        onClick={this.handleShowMoreOrLessDetailsClick}
      >
        {this.state.showMoreDetails ? 'Fewer' : 'More'} details{' '}
        <Icon type={this.state.showMoreDetails ? 'up' : 'down'} />
      </button>
    );
  };

  render() {
    return (
      <div>
        <div className="card__notes">{this.props.event.event_notes}</div>
        <ItineraryEventExtraDetails
          visible={this.state.showMoreDetails}
          event={this.props.event}
        />

        {this.renderDetailsLink()}
      </div>
    );
  }
}
