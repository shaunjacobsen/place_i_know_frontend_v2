import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import moment from 'moment';
import { getItineraryEventsForDate } from './../../actions/activeTrip';

export class ItineraryDatesSelectorOption extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSelectDate = () => {
    this.props.selectDate(this.props.date);
  }

  render() {
    return (
      <Button key={this.props.date} onClick={this.handleSelectDate}>
        {moment(this.props.date).format('ddd D MMM')}
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectDate: date => dispatch(getItineraryEventsForDate(date)),
  };
};

export default connect(undefined, mapDispatchToProps)(ItineraryDatesSelectorOption);
